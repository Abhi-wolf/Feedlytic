"use server";

import { and, db, desc, eq, sql } from "@/db";
import { events } from "@/db/schema/eventSchema";

export async function getEvents({ domain }) {
  try {
    const data = await db
      .select({
        eventName: events.eventName,
        count: sql`COUNT(${events.id})`.as("totalVisists"),
      })
      .from(events)
      .where(eq(events.domain, domain))
      .groupBy(events.eventName)
      .orderBy(desc(sql`COUNT(${events.id})`));

    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function getEventsList({ domain, eventName }) {
  try {
    let data = [];
    if (eventName === "all") {
      data = await db
        .select()
        .from(events)
        .where(eq(events.domain, domain))
        .orderBy(desc(events.createdAt));
    } else {
      data = await db
        .select()
        .from(events)
        .where(and(eq(events.domain, domain), eq(events.eventName, eventName)))
        .orderBy(desc(events.createdAt));
    }

    return data;
  } catch (error) {
    console.error(error);
  }
}
