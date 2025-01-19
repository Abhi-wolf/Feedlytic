"use server";

import { auth } from "@/auth";
import { and, db, eq, gte, lte, sql } from "@/db";
import { pageViews, visits, websites } from "@/db/schema/websiteSchema";
import { eachDayOfInterval, formatISO, subDays, subMonths } from "date-fns";

const findDateRange = (dateRange) => {
  switch (dateRange) {
    case "30d":
      return subMonths(new Date(), 1);
    case "7d":
      return subDays(new Date(), 7);
    case "90d":
      return subMonths(new Date(), 3);
    default:
      return subMonths(new Date(), 1);
  }
};

export async function getUserWebsites() {
  const session = await auth();
  const user = session?.user;

  if (!user?.id) {
    return { error: "Unauthorized access", data: [] };
  }

  try {
    const data = await db
      .select()
      .from(websites)
      .where(eq(websites.userId, user.id));

    return { data, error: null };
  } catch (error) {
    console.error(error.message);
    return { error: error.message };
  }
}

export async function getWebsiteDetails({ params }) {
  if (!params || !params.website) {
    return {};
  }

  try {
    const data = await db
      .select()
      .from(websites)
      .where(eq(websites.domain, params.website));

    if (data.length == 0) throw new Error("Website not found");

    return data[0];
  } catch (error) {}
}

export async function getTotalDomainVisits({ params, dateRange }) {
  if (!params || !params.website) {
    return {};
  }

  const actualStartDate = formatISO(findDateRange(dateRange));
  const actualEndDate = formatISO(new Date());

  const website = await db
    .select()
    .from(websites)
    .where(eq(websites.domain, params.website));

  if (website.length == 0) throw new Error("Website not found");

  try {
    const data = await db
      .select({ total: sql`COUNT(${visits.id})`.as("totalVisists") })
      .from(visits)
      .where(
        and(
          eq(visits.domain, params.website),
          gte(visits.createdAt, actualStartDate),
          lte(visits.createdAt, actualEndDate)
        )
      );

    if (data.length > 0) return data[0].total;

    return 0;
  } catch (error) {
    console.error(error);
  }
}

export async function getTotalPageVisits({ params, dateRange }) {
  if (!params || !params.website) {
    return {};
  }

  const website = await db
    .select()
    .from(websites)
    .where(eq(websites.domain, params.website));

  if (website.length == 0) throw new Error("Website not found");

  const actualStartDate = formatISO(findDateRange(dateRange));
  const actualEndDate = formatISO(new Date());

  try {
    const data = await db
      .select({
        visits: sql`COUNT(${pageViews.id})`.as("pageVisits"),
      })
      .from(pageViews)
      .where(
        and(
          eq(pageViews.domain, params.website),
          gte(pageViews.createdAt, actualStartDate),
          lte(pageViews.createdAt, actualEndDate)
        )
      );

    if (data.length > 0) return data[0].visits;

    return 0;
  } catch (error) {
    console.error(error);
  }
}

export async function getPageVisits({ params, dateRange }) {
  if (!params || !params.website) {
    return {};
  }

  const actualStartDate = formatISO(findDateRange(dateRange));
  const actualEndDate = formatISO(new Date());

  try {
    const data = await db
      .select({
        page: pageViews.page,
        visits: sql`COUNT(*)`.as("visits"),
      })
      .from(pageViews)
      .where(
        and(
          eq(pageViews.domain, params.website),
          gte(pageViews.createdAt, actualStartDate),
          lte(pageViews.createdAt, actualEndDate)
        )
      )
      .groupBy(pageViews.page)
      .orderBy(sql`COUNT(*) DESC`)
      .limit(10);

    const processedData = data?.map((item) => ({
      page: new URL(item.page).pathname,
      visits: item.visits,
    }));

    return processedData;
  } catch (error) {
    console.error(error);
  }
}

export async function getSourceVisits({ params, dateRange }) {
  if (!params || !params.website) {
    return {};
  }

  const actualStartDate = formatISO(findDateRange(dateRange));
  const actualEndDate = formatISO(new Date());

  try {
    const data = await db
      .select({
        source: visits.source,
        visits: sql`COUNT(*)`.as("visits"),
      })
      .from(visits)
      .where(
        and(
          eq(visits.domain, params.website),
          gte(visits.createdAt, actualStartDate),
          lte(visits.createdAt, actualEndDate)
        )
      )
      .groupBy(visits.source)
      .orderBy(sql`COUNT(*) DESC`)
      .limit(10);

    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function getOSVisits({ params, dateRange }) {
  if (!params || !params.website) {
    return {};
  }

  const actualStartDate = formatISO(findDateRange(dateRange));
  const actualEndDate = formatISO(new Date());

  try {
    const data = await db
      .select({
        os: visits.os,
        visits: sql`COUNT(*)`.as("visits"),
      })
      .from(visits)
      .where(
        and(
          eq(visits.domain, params.website),
          gte(visits.createdAt, actualStartDate),
          lte(visits.createdAt, actualEndDate)
        )
      )
      .groupBy(visits.os)
      .orderBy(sql`COUNT(*) DESC`)
      .limit(10);

    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function getDeviceVisits({ params, dateRange }) {
  if (!params || !params.website) {
    return {};
  }

  const actualStartDate = formatISO(findDateRange(dateRange));
  const actualEndDate = formatISO(new Date());

  try {
    const data = await db
      .select({
        device: visits.deviceType,
        visits: sql`COUNT(*)`.as("visits"),
      })
      .from(visits)
      .where(
        and(
          eq(visits.domain, params.website),
          gte(visits.createdAt, actualStartDate),
          lte(visits.createdAt, actualEndDate)
        )
      )
      .groupBy(visits.deviceType)
      .orderBy(sql`COUNT(*) DESC`)
      .limit(10);

    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function getBrowserVisits({ params, dateRange }) {
  if (!params || !params.website) {
    return undefined;
  }

  const actualStartDate = formatISO(findDateRange(dateRange));
  const actualEndDate = formatISO(new Date());

  try {
    const data = await db
      .select({
        browser: visits.browser,
        visits: sql`COUNT(*)`.as("visits"),
      })
      .from(visits)
      .where(
        and(
          eq(visits.domain, params.website),
          gte(visits.createdAt, actualStartDate),
          lte(visits.createdAt, actualEndDate)
        )
      )
      .groupBy(visits.browser)
      .orderBy(sql`COUNT(*) DESC`)
      .limit(10);

    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function getTimeZoneVisits({ params, dateRange }) {
  if (!params || !params.website) {
    return undefined;
  }

  const actualStartDate = formatISO(findDateRange(dateRange));
  const actualEndDate = formatISO(new Date());

  try {
    const data = await db
      .select({
        timezone: visits.timezone,
        visits: sql`COUNT(*)`.as("visits"),
      })
      .from(visits)
      .where(
        and(
          eq(visits.domain, params.website),
          gte(visits.createdAt, actualStartDate),
          lte(visits.createdAt, actualEndDate)
        )
      )
      .groupBy(visits.timezone)
      .orderBy(sql`COUNT(*) DESC`)
      .limit(10);

    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function getCountryVisits({ params, dateRange }) {
  if (!params || !params.website) {
    return undefined;
  }

  const actualStartDate = formatISO(findDateRange(dateRange));
  const actualEndDate = formatISO(new Date());

  try {
    const data = await db
      .select({
        country: visits.country,
        visits: sql`COUNT(*)`.as("visits"),
      })
      .from(visits)
      .where(
        and(
          eq(visits.domain, params.website),
          gte(visits.createdAt, actualStartDate),
          lte(visits.createdAt, actualEndDate)
        )
      )
      .groupBy(visits.country)
      .orderBy(sql`COUNT(*) DESC`)
      .limit(10);

    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function getThreeMonthPageViews(domain) {
  const threeMonthsAgo = subMonths(new Date(), 3);
  const actualStartDate = formatISO(threeMonthsAgo);
  const actualEndDate = formatISO(new Date());

  try {
    const data = await db
      .select({
        date: sql`DATE(${pageViews.createdAt})`,
        views: sql`COUNT(*)`,
      })
      .from(pageViews)
      .where(
        and(
          eq(pageViews.domain, domain),
          gte(pageViews.createdAt, actualStartDate),
          lte(pageViews.createdAt, actualEndDate)
        )
      )
      .groupBy(sql`DATE(${pageViews.createdAt})`)
      .orderBy(sql`DATE(${pageViews.createdAt})`);

    // Ensure that data exists before processing
    if (!data || data.length === 0) {
      return [];
    }

    // Format the data to return as a structured array
    const formattedData = data?.map((record) => ({
      date: record.date, // The date is already formatted
      views: record.views,
    }));

    // Added dates with zero visits if they are missing
    const allDates = eachDayOfInterval({
      start: threeMonthsAgo,
      end: new Date(),
    }).map((date) => formatISO(date, { representation: "date" }));

    // Merged formattedData with zero visits for missing dates
    const completeData = allDates.map((date) => {
      const dataForDate = formattedData?.find((record) => record.date === date);
      return dataForDate || { date, views: 0 }; // If no data for the date, set visits to 0
    });

    return completeData;
  } catch (error) {
    console.error("Error fetching page views data:", error);
    return [];
  }
}

export async function getThreeMonthDomainVisits(domain) {
  const threeMonthsAgo = subMonths(new Date(), 3);
  const actualStartDate = formatISO(threeMonthsAgo);
  const actualEndDate = formatISO(new Date());

  try {
    const data = await db
      .select({
        date: sql`DATE(${visits.createdAt})`,
        visits: sql`COUNT(*)`,
      })
      .from(visits)
      .where(
        and(
          eq(visits.domain, domain),
          gte(visits.createdAt, actualStartDate),
          lte(visits.createdAt, actualEndDate)
        )
      )
      .groupBy(sql`DATE(${visits.createdAt})`)
      .orderBy(sql`DATE(${visits.createdAt})`);

    // Ensured that data exists before processing
    if (!data || data.length === 0) {
      return [];
    }

    // Formated the data to return as a structured array
    const formattedData = data?.map((record) => ({
      date: record.date, // The date is already formatted
      visits: record.visits,
    }));

    // Added dates with zero visits if they are missing
    const allDates = eachDayOfInterval({
      start: threeMonthsAgo,
      end: new Date(),
    }).map((date) => formatISO(date, { representation: "date" }));

    // Merged formattedData with zero visits for missing dates
    const completeData = allDates.map((date) => {
      const dataForDate = formattedData?.find((record) => record.date === date);
      return dataForDate || { date, visits: 0 }; // If no data for the date, set visits to 0
    });

    return completeData;
  } catch (error) {
    console.error("Error fetching page views data:", error);
    return [];
  }
}
