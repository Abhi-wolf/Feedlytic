import { auth } from "@/auth";
import { and, db, desc, eq, gte, lte } from "@/db";
import { feedbacks } from "@/db/schema/feedbackSchema";
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

export async function getFeedbacks({ domain, dateRange }) {
  const session = await auth();

  if (!session?.userId || !domain) {
    return [];
  }

  const actualStartDate = formatISO(findDateRange(dateRange));
  const actualEndDate = formatISO(new Date());

  try {
    const data = await db
      .select()
      .from(feedbacks)
      .where(
        and(
          eq(feedbacks.domain, domain),
          gte(feedbacks.createdAt, actualStartDate),
          lte(feedbacks.createdAt, actualEndDate)
        )
      )
      .orderBy(desc(feedbacks.createdAt));

    return data;
  } catch (error) {
    console.error(error);
  }
}
