import { db, eq } from "@/db";
import { websites } from "@/db/schema/websiteSchema";
import { Redis } from "@upstash/redis";
import { differenceInSeconds, endOfMonth } from "date-fns";

export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_URL,
  token: process.env.UPSTASH_REDIS_TOKEN,
});

function getSecondsUntilEndOfMonth() {
  const now = new Date();
  const endOfCurrentMonth = endOfMonth(now);
  return differenceInSeconds(endOfCurrentMonth, now);
}

export async function domainLimiter(domain, type) {
  try {
    let domainData = await redis.get(domain);

    if (!domainData) {
      console.log("domain = ", domain);
      const all = await db.select().from(websites);

      // console.log("all", all);

      const existingWebsite = await db
        .select()
        .from(websites)
        .where(eq(websites.domain, domain));

      // console.log("existingWebsite", existingWebsite, domain);

      if (existingWebsite?.length === 0) {
        return { status: 404, error: "Domain not found in database" };
      }

      const secondsUntilEndOfMonth = getSecondsUntilEndOfMonth();

      const initialData = {
        track_count: 0,
        event_count: 0,
        feedback_count: 0,
        max_track: 1000,
        max_event: 500,
        max_feedback: 300,
      };

      await redis.set(domain, JSON.stringify(initialData), {
        ex: secondsUntilEndOfMonth,
      });

      domainData = initialData;
    }

    const countKey = `${type}_count`;
    const maxKey = `max_${type}`;

    if (domainData[countKey] < domainData[maxKey]) {
      domainData[countKey]++;
      await redis.set(domain, JSON.stringify(domainData));
      return { status: 200 };
    } else {
      return {
        status: 429,
        error: `Request limit reached for ${type}`,
      };
    }
  } catch (error) {
    console.error(error);

    return { status: 500, error: "Internal server error" };
  }
}
