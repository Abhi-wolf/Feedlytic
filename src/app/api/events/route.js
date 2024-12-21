import { db, eq } from "@/db";
import { events } from "@/db/schema/eventSchema";
import { websites } from "@/db/schema/websiteSchema";
import { headers } from "next/headers";
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
  console.log("events/route");
  const authHeader = headers().get("authorization");

  const body = await req.json();

  console.log("Event Request Body: ", body);

  const { eventName, domain, eventDescription } = body;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    const apiKey = authHeader.split("Bearer ")[1];

    console.log("API Key: ", apiKey);

    try {
      const website = await db
        .select()
        .from(websites)
        .where(eq(websites.domain, domain));

      console.log("Website: ", website);

      if (website.length == 0) {
        return NextResponse.json(
          { error: "Domain not found" },
          { status: 200 },
          { headers: corsHeaders }
        );
      }

      if (website[0].apiKey !== apiKey) {
        console.log("Invalid Api Key");
        return NextResponse.json(
          { error: "Invalid Api Key" },
          { status: 200 },
          { headers: corsHeaders }
        );
      }

      const [event] = await db
        .insert(events)
        .values({
          domain: domain,
          eventName: eventName,
          eventDescription: eventDescription,
        })
        .returning();

      console.log("Event: ", event);

      return NextResponse.json(
        { message: "success" },
        { status: 200 },
        { headers: corsHeaders }
      );
    } catch (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 },
        { headers: corsHeaders }
      );
    }
  }
}
