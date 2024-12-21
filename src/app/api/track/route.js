import { db } from "@/db";
import { pageViews, visits } from "@/db/schema/websiteSchema";
import { NextResponse } from "next/server";

export const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS(request) {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(req) {
  console.log("track/route  ");

  const res = await req.json();

  console.log("Request Body: ", res);

  // Get IP address from request
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0] ||
    req.headers.get("x-real-ip") ||
    "0.0.0.0";

  console.log("IP Address: ", ip);

  // Get country from IP using GeoJS
  const geoResponse = await fetch(
    `https://get.geojs.io/v1/ip/country/${ip}.json`
  );
  const geoData = await geoResponse.json();
  const country = geoData.name || "unknown";

  console.log("Country: ", country);
  console.log("geoData: ", geoData);

  const { domain, url, event, source } = res;

  if (!url.includes(domain))
    return NextResponse.json(
      {
        error:
          "The script points to a different domain than the current url. make sure they match",
      },
      { headers: corsHeaders }
    );

  if (event == "session_start") {
    await db
      .insert(visits)
      .values({ domain: domain, country: country, source: source ?? "direct" });
  }

  if (event == "pageview") {
    await db.insert(pageViews).values({
      domain: domain,
      page: url,
    });
  }
  return NextResponse.json({ res }, { headers: corsHeaders });
}
