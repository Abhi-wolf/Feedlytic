// import { db, eq } from "@/db";
// import { events } from "@/db/schema/eventSchema";
// import { websites } from "@/db/schema/websiteSchema";
// import { domainLimiter } from "@/lib/redis";
// import { headers } from "next/headers";
// import { NextResponse } from "next/server";

// export const corsHeaders = {
//   "Access-Control-Allow-Origin": "*",
//   "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
//   "Access-Control-Allow-Headers": "Content-Type, Authorization",
// };

// export async function OPTIONS(request) {
//   return NextResponse.json({}, { headers: corsHeaders });
// }

// export async function POST(req) {
//   const authHeader = headers().get("authorization");

//   const body = await req.json();

//   console.log("body", body);

//   const { eventName, domain, eventDescription } = body;

//   if (!domain || !eventName || !eventDescription) {
//     return NextResponse.json(
//       { error: "All fields are required" },
//       { status: 500 },
//       { headers: corsHeaders }
//     );
//   }

//   const limit = await domainLimiter(domain, "event");

//   console.log("REDIS LIMIT =", limit);

//   if (limit.status !== 200) {
//     return NextResponse.json(
//       { error: limit?.error || "Failed to process events" },
//       { status: 500 }
//     );
//   }

//   if (authHeader && authHeader.startsWith("Bearer ")) {
//     const apiKey = authHeader.split("Bearer ")[1];
//     console.log("API KEY =, ", apiKey);

//     try {
//       const website = await db
//         .select()
//         .from(websites)
//         .where(eq(websites.domain, domain));

//       console.log("ROUTE WEBSITE =, ", website);

//       if (website?.length == 0) {
//         return NextResponse.json(
//           { error: "Domain not found" },
//           { status: 404 },
//           { headers: corsHeaders }
//         );
//       }

//       if (website[0].apiKey !== apiKey) {
//         console.error("Invalid Api Key");
//         return NextResponse.json(
//           { error: "Invalid Api Key" },
//           { status: 401 },
//           { headers: corsHeaders }
//         );
//       }

//       const [event] = await db
//         .insert(events)
//         .values({
//           domain: domain,
//           eventName: eventName,
//           eventDescription: eventDescription,
//         })
//         .returning();

//       return NextResponse.json(
//         { message: "success" },
//         { status: 200 },
//         { headers: corsHeaders }
//       );
//     } catch (error) {
//       return NextResponse.json(
//         { error: error.message },
//         { status: 500 },
//         { headers: corsHeaders }
//       );
//     }
//   }
// }

import { db, eq } from "@/db";
import { events } from "@/db/schema/eventSchema";
import { websites } from "@/db/schema/websiteSchema";
import { domainLimiter } from "@/lib/redis";
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
  try {
    const authHeader = headers().get("authorization");

    // Parse JSON with error handling
    let body;
    try {
      body = await req.json();
    } catch (error) {
      console.error("JSON parsing error:", error);
      return NextResponse.json(
        { error: "Invalid JSON format" },
        { status: 400, headers: corsHeaders }
      );
    }

    console.log("body", body);

    const { eventName, domain, eventDescription } = body;

    // Validate required fields
    if (!domain || !eventName || !eventDescription) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400, headers: corsHeaders } // Changed from 500 to 400
      );
    }

    // Check rate limit
    const limit = await domainLimiter(domain, "event");
    console.log("REDIS LIMIT =", limit);

    if (limit.status !== 200) {
      return NextResponse.json(
        { error: limit?.error || "Failed to process events" },
        { status: 429, headers: corsHeaders } // Changed to 429 for rate limiting
      );
    }

    // Check if authorization header exists
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "Authorization header required" },
        { status: 401, headers: corsHeaders }
      );
    }

    const apiKey = authHeader.split("Bearer ")[1];
    console.log("API KEY =, ", apiKey);

    try {
      // Fetch website by domain
      const website = await db
        .select()
        .from(websites)
        .where(eq(websites.domain, domain));

      console.log("ROUTE WEBSITE =, ", website);

      // Check if website exists
      if (!website || website.length === 0) {
        return NextResponse.json(
          { error: "Domain not found" },
          { status: 404, headers: corsHeaders }
        );
      }

      // Validate API key
      if (website[0].apiKey !== apiKey) {
        console.error("Invalid Api Key");
        return NextResponse.json(
          { error: "Invalid Api Key" },
          { status: 401, headers: corsHeaders }
        );
      }

      // Insert event
      const [event] = await db
        .insert(events)
        .values({
          domain: domain,
          eventName: eventName,
          eventDescription: eventDescription,
        })
        .returning();

      return NextResponse.json(
        { message: "success", event },
        { status: 200, headers: corsHeaders }
      );
    } catch (error) {
      console.error("Database error:", error);
      return NextResponse.json(
        { error: "Internal server error" },
        { status: 500, headers: corsHeaders }
      );
    }
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500, headers: corsHeaders }
    );
  }
}
