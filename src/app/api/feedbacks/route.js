import { db, eq } from "@/db";
import { feedbacks } from "@/db/schema/feedbackSchema";
import { websites } from "@/db/schema/websiteSchema";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS(request) {
  return NextResponse.json(null, {
    headers: {
      ...corsHeaders,
      "Content-Length": "0",
    },
    status: 204,
  });
}

export async function POST(req) {
  const authHeader = headers().get("authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json(
      { error: "Missing or invalid Authorization header" },
      { status: 401, headers: corsHeaders }
    );
  }

  const body = await req.json();
  const { userName, domain, feedback, rating } = body;

  if (!userName || !domain || !feedback || !rating) {
    return NextResponse.json(
      { error: "Invalid input" },
      { status: 400, headers: corsHeaders }
    );
  }

  const apiKey = authHeader.split("Bearer ")[1];

  try {
    const website = await db
      .select()
      .from(websites)
      .where(eq(websites.domain, domain));

    if (website.length === 0) {
      return NextResponse.json(
        { error: "Domain not found" },
        { status: 404, headers: corsHeaders }
      );
    }

    if (website[0].apiKey !== apiKey) {
      return NextResponse.json(
        { error: "Invalid API Key" },
        { status: 403, headers: corsHeaders }
      );
    }

    const [res] = await db
      .insert(feedbacks)
      .values({
        domain: domain,
        userName: userName,
        feedback: feedback,
        rating: Number(rating),
      })
      .returning();

    return NextResponse.json(
      { message: "Success", data: res },
      { status: 200, headers: corsHeaders }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "An unexpected error occurred", details: error.message },
      { status: 500, headers: corsHeaders }
    );
  }
}
