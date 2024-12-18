import { db, desc, eq } from "@/db";
import { feedbacks } from "@/db/schema/feedbackSchema";

export async function getFeedbacks({ domain }) {
  try {
    const data = await db
      .select()
      .from(feedbacks)
      .where(eq(feedbacks.domain, domain))
      .orderBy(desc(feedbacks.createdAt));

    return data;
  } catch (error) {
    console.error(error);
  }
}
