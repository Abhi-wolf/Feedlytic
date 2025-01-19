(function () {
  "use strict";

  var location = window.location;
  var document = window.document;
  var scriptElement = document.currentScript;
  var dataDomain = scriptElement.getAttribute("data-domain");
  let queryString = location.search;
  const params = new URLSearchParams(queryString);
  var source = params.get("utm");

  // var endpoint = "http://localhost:3000/api/track";
  var endpoint = "https://feedlytic.vercel.app/api/track";

  let cachedDeviceInfo = null;
  let cachedLocationInfo = null;
  let eventQueue = [];
  const BATCH_INTERVAL = 5000; // 5 seconds
  const SESSION_DURATION = 10 * 60 * 1000; // 10 minutes

  // URLs to ignore
  const ignoredUrlPatterns = [
    /\/api\/auth\/callback\//,
    /\/oauth\/callback/,
    /\?code=/,
    /\?token=/,
    /\/auth\//,
    /sign-in-with-/,
    /\/login\/oauth\//,
    /\/authorize\?/,
  ];

  function shouldTrackUrl(url) {
    return !ignoredUrlPatterns.some((pattern) => pattern.test(url));
  }

  function generateSessionId() {
    return "session-" + Math.random().toString(36).substr(2, 9);
  }

  function initializeSession() {
    var sessionId = localStorage.getItem("session_id");
    var expirationTimestamp = localStorage.getItem(
      "session_expiration_timestamp"
    );

    if (
      !sessionId ||
      !expirationTimestamp ||
      isSessionExpired(expirationTimestamp)
    ) {
      sessionId = generateSessionId();
      expirationTimestamp = Date.now() + SESSION_DURATION;
      localStorage.setItem("session_id", sessionId);
      localStorage.setItem("session_expiration_timestamp", expirationTimestamp);
      trackSessionStart();
    }

    return {
      sessionId: sessionId,
      expirationTimestamp: parseInt(expirationTimestamp),
    };
  }

  function isSessionExpired(expirationTimestamp) {
    return Date.now() >= parseInt(expirationTimestamp);
  }

  function refreshSession() {
    const expirationTimestamp = Date.now() + SESSION_DURATION;
    localStorage.setItem("session_expiration_timestamp", expirationTimestamp);
  }

  function checkSessionStatus() {
    var session = initializeSession();
    if (isSessionExpired(session.expirationTimestamp)) {
      localStorage.removeItem("session_id");
      localStorage.removeItem("session_expiration_timestamp");
      trackSessionEnd();
      initializeSession();
    } else {
      refreshSession(); // Extend session on activity
    }
  }

  async function getDeviceInfo() {
    if (cachedDeviceInfo) return cachedDeviceInfo;

    const userAgent = navigator.userAgent;

    // Device type detection
    let deviceType = "desktop";
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(userAgent)) {
      deviceType = "tablet";
    } else if (
      /Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated/.test(
        userAgent
      )
    ) {
      deviceType = "mobile";
    }

    // OS detection
    let os = "Unknown";
    if (/Windows/.test(userAgent)) os = "windows";
    else if (/Android/.test(userAgent)) os = "android";
    else if (/iPhone|iPad|iPod/.test(userAgent)) os = "iOS";
    else if (/Mac/.test(userAgent)) os = "macOS";
    else if (/Linux/.test(userAgent)) os = "linux";

    // Browser detection
    let browser = "unknown";
    if (userAgent?.includes("Chrome")) browser = "chrome";
    else if (userAgent?.includes("Firefox")) browser = "firefox";
    else if (userAgent?.includes("Safari")) browser = "safari";
    else if (userAgent?.includes("Edge")) browser = "edge";
    else if (userAgent?.includes("Opera")) browser = "opera";

    cachedDeviceInfo = {
      os,
      deviceType,
      browser,
      screenWidth: window.screen.width,
      screenHeight: window.screen.height,
      viewportWidth: window.innerWidth,
      viewportHeight: window.innerHeight,
      language: navigator.language || navigator.userLanguage,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    };

    return cachedDeviceInfo;
  }

  async function getLocationInfo() {
    if (cachedLocationInfo) return cachedLocationInfo;

    try {
      const response = await fetch("https://ipapi.co/json/");
      if (response.ok) {
        const data = await response.json();
        cachedLocationInfo = {
          country: data.country_name,
          region: data.region,
          city: data.city,
          timezone: data.timezone,
        };
        return cachedLocationInfo;
      }

      return {
        country: "unknown",
        region: "unknown",
        city: "unknown",
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      };
    } catch (error) {
      console.error("Error fetching location:", error);
      return {
        country: "unknown",
        region: "unknown",
        city: "unknown",
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      };
    }
  }

  async function trigger(eventName, options = {}) {
    // Skip tracking for ignored URLs
    if (!shouldTrackUrl(location.href)) {
      return;
    }

    const [deviceInfo, locationInfo] = await Promise.all([
      getDeviceInfo(),
      getLocationInfo(),
    ]);

    const payload = {
      event: eventName,
      url: location.href,
      domain: dataDomain,
      source,
      referrer: document.referrer,
      timestamp: new Date().toISOString(),
      sessionId: localStorage.getItem("session_id"),
      ...deviceInfo,
      ...locationInfo,
    };

    eventQueue.push(payload);

    // if (options.immediate || eventQueue.length >= 10) {
    if (options.immediate || eventQueue.length >= 1) {
      sendBatch();
    }
  }

  function sendBatch() {
    if (eventQueue?.length === 0) return;

    const payload = eventQueue.splice(0, eventQueue.length);

    if (navigator.sendBeacon) {
      const success = navigator.sendBeacon(endpoint, JSON.stringify(payload));
      if (!success) fallbackSend(payload);
    } else {
      fallbackSend(payload);
    }
  }

  function fallbackSend(payload) {
    fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      keepalive: true,
    }).catch((error) => console.error("Error sending analytics:", error));
  }

  function trackPageView() {
    trigger("pageview");
  }

  function trackSessionStart() {
    trigger("session_start", { immediate: true });
  }

  function trackSessionEnd() {
    trigger("session_end", { immediate: true });
  }

  // Debounce utility function
  function debounce(func, delay) {
    let debounceTimer;
    return function (...args) {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => func.apply(this, args), delay);
    };
  }

  // Handle page visibility changes
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      sendBatch(); // Send any queued events before page is hidden
    } else {
      checkSessionStatus(); // Check session when page becomes visible
    }
  });

  // Send queued events before page unload
  window.addEventListener("beforeunload", () => {
    sendBatch();
  });

  // Periodically send batched events
  setInterval(sendBatch, BATCH_INTERVAL);

  // Initialize tracking
  checkSessionStatus();
  trackPageView();

  var initialPathname = window.location.pathname;

  // Event listeners for navigation
  window.addEventListener("popstate", trackPageView);
  window.addEventListener("hashchange", trackPageView);

  // Track page changes with debouncing
  document.addEventListener(
    "click",
    debounce(() => {
      if (window.location.pathname !== initialPathname) {
        trackPageView();
        initialPathname = window.location.pathname;
      }
    }, 2000)
  );
})();
