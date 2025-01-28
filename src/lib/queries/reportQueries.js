import { and, db, eq, gte, lte, sql } from "@/db";
import { pageViews, visits, websites } from "@/db/schema/websiteSchema";
import { events } from "@/db/schema/eventSchema";
import { format, formatISO } from "date-fns";
import { feedbacks } from "@/db/schema/feedbackSchema";
import { users } from "@/db/schema/authSchema";

export async function getAllWebsites() {
  try {
    const data = await db
      .select({ domain: websites.domain, email: users.email })
      .from(websites)
      .innerJoin(users, eq(websites.userId, users.id))
      .where(eq(websites.status, "active"));
    return data;
  } catch (err) {
    console.log("GET ALL WEBSITES QUERY FUNCTION =", err);
  }
}

export async function generateMonthlyReport(month, year, domain) {
  const startDate = new Date(year, month - 1, 1).toString();
  const endDate = new Date(year, month, 0, 23, 59, 59).toString();

  const formatedStartDate = formatISO(startDate);
  const formatedEndDate = formatISO(endDate);

  const visitsReport = await db
    .select({ total: sql`COUNT(${visits.id})`.as("totalVisists") })
    .from(visits)
    .where(
      and(
        eq(visits.domain, domain),
        gte(visits.createdAt, formatedStartDate),
        lte(visits.createdAt, formatedEndDate)
      )
    );

  const pageViewsReport = await db
    .select({ total: sql`COUNT(${pageViews.id})`.as("totalPageViews") })
    .from(pageViews)
    .where(
      and(
        eq(pageViews.domain, domain),
        gte(pageViews.createdAt, formatedStartDate),
        lte(pageViews.createdAt, formatedEndDate)
      )
    );

  const eventsReport = await db
    .select({ total: sql`COUNT(${events.id})`.as("totalEvents") })
    .from(events)
    .where(
      and(
        eq(events.domain, domain),
        gte(events.createdAt, formatedStartDate),
        lte(events.createdAt, formatedEndDate)
      )
    );

  const feedbackReport = await db
    .select({ total: sql`COUNT(${feedbacks.id})`.as("totalFeedbacks") })
    .from(feedbacks)
    .where(
      and(
        eq(feedbacks.domain, domain),
        gte(feedbacks.createdAt, formatedStartDate),
        lte(feedbacks.createdAt, formatedEndDate)
      )
    );

  const topPageViews = await db
    .select({
      page: pageViews.page,
      visits: sql`COUNT(*)`.as("visits"),
    })
    .from(pageViews)
    .where(
      and(
        eq(pageViews.domain, domain),
        gte(pageViews.createdAt, formatedStartDate),
        lte(pageViews.createdAt, formatedEndDate)
      )
    )
    .groupBy(pageViews.page)
    .orderBy(sql`COUNT(*) DESC`)
    .limit(10);

  // console.log("VISITS = ",visitsReport);
  // console.log("PAGE VIEWS = ",pageViewsReport);
  // console.log("EVENTS = ",eventsReport);
  // console.log("FEEDBACKS =",feedbackReport);
  // console.log("TOP PAGE VIEWS = ",topPageViews);

  const formattedDate = format(new Date(year, month - 1), "MMMM yyyy");

  return {
    domain,
    totalVisits: visitsReport[0]?.total,
    totalPageViews: pageViewsReport[0]?.total,
    totalEvents: eventsReport[0]?.total,
    totalFeedbacks: feedbackReport[0]?.total,
    topPageViews,
    date: formattedDate,
  };
}
