"use server";

import { auth } from "@/auth";
import { db, eq, sql } from "@/db";
import { events } from "@/db/schema/eventSchema";
import { feedbacks } from "@/db/schema/feedbackSchema";
import { pageViews, visits, websites } from "@/db/schema/websiteSchema";

export async function getStatsSummary() {
  const session = await auth();
  const user = session?.user;

  if (!user) {
    return null;
  }

  try {
    const userId = user.id;

    const websiteCount = await db
      .select({ count: sql`COUNT(*)` })
      .from(websites)
      .where(eq(websites.userId, userId))
      .then(([result]) => result.count || 0);

    const totalPageViews = await db
      .select({ total: sql`COUNT(*)` })
      .from(pageViews)
      .fullJoin(websites, eq(pageViews.domain, websites.domain))
      .where(eq(websites.userId, userId))
      .then(([result]) => parseInt(result.total || 0, 10));

    // Calculating total visits across all websites
    const totalVisits = await db
      .select({ total: sql`COUNT(*)` })
      .from(visits)
      .fullJoin(websites, eq(visits.domain, websites.domain))
      .where(eq(websites.userId, userId))
      .then(([result]) => parseInt(result.total || 0, 10));

    // Calculating average rating from feedbacks
    const averageRating = await db
      .select({ avg: sql`AVG(${feedbacks.rating})` })
      .from(feedbacks)
      .fullJoin(websites, eq(feedbacks.domain, websites.domain))
      .where(eq(websites.userId, userId))
      .then(([result]) => parseFloat(result.avg || 0).toFixed(1));

    return {
      error: null,
      data: {
        websiteCount,
        totalPageViews,
        totalVisits,
        averageRating: parseFloat(averageRating),
      },
    };
  } catch (error) {
    // toast.error("Something went wrong");

    console.error(error.message);
    return {
      error: error?.message ? error.message : "Something went wrong",
      data: null,
    };
  }
}

export async function getRecentEvents() {
  const session = await auth();
  const user = session?.user;

  if (!user) {
    return null;
  }

  try {
    const userId = user.id;

    const recentEvents = await db
      .select({
        id: events.id,
        eventName: events.eventName,
        eventDescription: events.eventDescription,
        createdAt: events.createdAt,
      })
      .from(events)
      .innerJoin(websites, eq(events.domain, websites.domain))
      .where(eq(websites.userId, userId))
      .orderBy(sql`${events.createdAt} DESC`)
      .limit(10);

    return {
      error: null,
      data: recentEvents,
    };
  } catch (error) {
    console.error(error);
    return {
      error: error?.message ? error.message : "Something went wrong",
      data: null,
    };
  }
}

export async function getUserWebsitesInfo() {
  const session = await auth();
  const user = session?.user;

  if (!user) {
    return null;
  }

  try {
    const userId = user.id;

    const data = await db
      .select({ apiKey, domain })
      .from(websites)
      .where(eq(websites.userId, userId));

    return { error: null, data };
  } catch (error) {
    console.error(error);
    return {
      error: error?.message ? error.message : "Something went wrong",
      data: null,
    };
  }
}
