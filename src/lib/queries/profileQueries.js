"use server";

import { auth } from "@/auth";
import { db, eq, sql } from "@/db";
import { events } from "@/db/schema/eventSchema";
import { feedbacks } from "@/db/schema/feedbackSchema";
import { pageViews, visits, websites } from "@/db/schema/websiteSchema";

export async function getUserProfile1() {
  // Simulating a delay to show loading state
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return {
    user: {
      name: "Jane Doe",
      email: "jane.doe@example.com",
      image: "https://i.pravatar.cc/150?img=23",
    },
    websiteCount: 3,
    totalPageViews: 15784,
    totalVisits: 8942,
    averageRating: 4.7,
    recentEvents: [
      {
        id: "1",
        eventName: "New Feature Launch",
        eventDescription: "Launched dark mode across all websites",
        createdAt: "2023-06-15T10:30:00Z",
      },
      {
        id: "2",
        eventName: "Traffic Spike",
        eventDescription: "Unusual traffic increase on e-commerce site",
        createdAt: "2023-06-14T15:45:00Z",
      },
      {
        id: "3",
        eventName: "Feedback Milestone",
        eventDescription: "Reached 1000 user feedbacks",
        createdAt: "2023-06-13T09:00:00Z",
      },
      {
        id: "4",
        eventName: "Server Upgrade",
        eventDescription: "Completed server upgrade for improved performance",
        createdAt: "2023-06-12T14:20:00Z",
      },
      {
        id: "5",
        eventName: "New Website Added",
        eventDescription: "Added a new blog to the network",
        createdAt: "2023-06-11T11:10:00Z",
      },
    ],
  };
}

export async function getUserProfile() {
  const session = await auth();
  const user = session?.user;

  if (!user) {
    return null;
  }

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

  // Calculate total visits across all websites
  const totalVisits = await db
    .select({ total: sql`COUNT(*)` })
    .from(visits)
    .fullJoin(websites, eq(visits.domain, websites.domain))
    .where(eq(websites.userId, userId))
    .then(([result]) => parseInt(result.total || 0, 10));

  // Calculate average rating from feedbacks
  const averageRating = await db
    .select({ avg: sql`AVG(${feedbacks.rating})` })
    .from(feedbacks)
    .fullJoin(websites, eq(feedbacks.domain, websites.domain))
    .where(eq(websites.userId, userId))
    .then(([result]) => parseFloat(result.avg || 0).toFixed(1));

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
    user,
    websiteCount,
    totalPageViews,
    totalVisits,
    averageRating: parseFloat(averageRating),
    recentEvents: recentEvents.map((event) => ({
      id: event.id,
      eventName: event.eventName,
      eventDescription: event.eventDescription,
      createdAt: event.createdAt,
    })),
  };
}
