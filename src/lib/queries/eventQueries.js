"use server";

import { auth } from "@/auth";
import { and, db, desc, eq, gte, lte, sql } from "@/db";
import { events } from "@/db/schema/eventSchema";
import { formatISO, subDays, subMonths } from "date-fns";

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

export async function getEvents({ domain, dateRange }) {
  const session = await auth();

  if (!session?.userId || !domain) {
    return [];
  }

  const actualStartDate = formatISO(findDateRange(dateRange));
  const actualEndDate = formatISO(new Date());

  try {
    const data = await db
      .select({
        eventName: events.eventName,
        count: sql`COUNT(${events.id})`.as("totalVisists"),
      })
      .from(events)
      .where(
        and(
          eq(events.domain, domain),
          gte(events.createdAt, actualStartDate),
          lte(events.createdAt, actualEndDate)
        )
      )
      .groupBy(events.eventName)
      .orderBy(desc(sql`COUNT(${events.id})`));

    return data;
  } catch (error) {
    console.error(error);
    return { error: error.message };
  }
}

export async function getEventsList({ domain, eventName, dateRange }) {
  const session = await auth();

  if (!session?.userId || !domain) {
    return [];
  }

  const actualStartDate = formatISO(findDateRange(dateRange));
  const actualEndDate = formatISO(new Date());

  try {
    let data = [];
    if (eventName === "all") {
      data = await db
        .select()
        .from(events)
        .where(
          and(
            eq(events.domain, domain),
            gte(events.createdAt, actualStartDate),
            lte(events.createdAt, actualEndDate)
          )
        )
        .orderBy(desc(events.createdAt));
    } else {
      data = await db
        .select()
        .from(events)
        .where(
          and(
            eq(events.domain, domain),
            eq(events.eventName, eventName),
            gte(events.createdAt, actualStartDate),
            lte(events.createdAt, actualEndDate)
          )
        )
        .orderBy(desc(events.createdAt));
    }

    return data;
  } catch (error) {
    console.error(error);
  }
}
