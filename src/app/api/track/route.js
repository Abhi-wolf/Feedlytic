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
  const body = await req.json(); // Parse the entire batch of events

  if (!Array.isArray(body) || body.length === 0) {
    return NextResponse.json(
      { error: "No events to process" },
      { status: 400 }
    );
  }

  try {
    for (const event of body) {
      const {
        domain,
        url,
        event: eventType,
        source,
        deviceType,
        os,
        browser,
        country,
        timezone,
      } = event;

      if (!domain || !eventType) {
        console.error("Invalid event data:", event);
        continue;
      }

      if (eventType === "session_start") {
        await db.insert(visits).values({
          domain,
          country,
          timezone,
          os,
          browser,
          deviceType,
          source: source ?? "direct",
        });
      }

      if (eventType === "pageview") {
        await db.insert(pageViews).values({
          domain,
          page: url,
        });
      }
    }

    return NextResponse.json({ success: true }, { headers: corsHeaders });
  } catch (error) {
    console.error("Error processing events:", error);
    return NextResponse.json(
      { error: "Failed to process events" },
      { status: 500 }
    );
  }
}
