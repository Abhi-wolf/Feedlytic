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
  console.log("Hello world");

  const res = await req.json();
  console.log("RES = ", res);
  const { domain, url, event, source } = res;
  if (!url.includes(domain))
    return NextResponse.json(
      {
        error:
          "The script points to a different domain than the current url. make sure thy match",
      },
      { headers: corsHeaders }
    );

  // if (event == "session_start") {
  //   // adding new row to log a new visit with its source
  //   await supabase
  //     .from("visits")
  //     .insert([{ website_id: domain, source: source ?? "Direct" }])
  //     .select();
  // }

  /*
    const [newWebsite] = await db
      .insert(websites)
      .values({
        domain: input.domain,
        userId: input.userId,
      })
      .returning();

      export const pageViews = pgTable("pageviews", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  domain: text("domain").notNull(),
  page: text("page").notNull(),
  domainId: text("domain_id").references(() => websites.id, {
    onDelete: "cascade",
  }),
  createdAt: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "string" }).notNull().defaultNow(),
});

export const visits = pgTable("visits", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  domain: text("domain").notNull(),
  source: text("source").notNull().default("direct"),
  createdAt: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "string" }).notNull().defaultNow(),
});
  */

  if (event == "session_start") {
    await db
      .insert(visits)
      .values({ domain: domain, source: source ?? "direct" });
  }

  if (event == "pageview") {
    await db.insert(pageViews).values({
      domain: domain,
      page: url,
    });
  }
  return NextResponse.json({ res }, { headers: corsHeaders });
}
