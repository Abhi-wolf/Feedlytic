import { auth } from "@/auth";
import { db, eq, sql } from "@/db";
import { pageViews, visits, websites } from "@/db/schema/websiteSchema";

export async function getUserWebsites() {
  const session = await auth();
  const user = session?.user;

  try {
    const data = await db
      .select()
      .from(websites)
      .where(eq(websites.userId, user.id));

    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function getTotalDomainVisits({ params }) {
  if (!params || !params.website) {
    return undefined;
  }

  const website = await db
    .select()
    .from(websites)
    .where(eq(websites.domain, params.website));

  if (website.length == 0) throw new Error("Website not found");

  try {
    const data = await db
      .select({ total: sql`COUNT(${visits.id})`.as("totalVisists") })
      .from(visits)
      .where(eq(visits.domain, params.website));

    console.log("TOTAL VIEWS = ", data);

    if (data.length > 0) return data[0].total;

    return 0;
  } catch (error) {
    console.error(error);
  }
}

export async function getTotalPageVisits({ params }) {
  if (!params || !params.website) {
    return undefined;
  }

  const website = await db
    .select()
    .from(websites)
    .where(eq(websites.domain, params.website));

  if (website.length == 0) throw new Error("Website not found");

  try {
    const data = await db
      .select({
        visits: sql`COUNT(${pageViews.id})`.as("pageVisits"),
      })
      .from(pageViews)
      .where(eq(pageViews.domain, params.website));

    console.log("PAGE VIEWS = ", data);

    if (data.length > 0) return data[0].visits;

    return 0;
  } catch (error) {
    console.error(error);
  }
}

export async function getPageVisits({ params }) {
  if (!params || !params.website) {
    return undefined;
  }

  try {
    const data = await db
      .select({
        page: pageViews.page,
        visits: sql`COUNT(*)`.as("visits"),
      })
      .from(pageViews)
      .where(sql`${pageViews.domain} = ${params.website}`)
      .groupBy(pageViews.page)
      .orderBy(sql`COUNT(*) DESC`);

    console.log("PAGE VISITS AND COUNT = ", data);

    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function getSourceVisits({ params }) {
  if (!params || !params.website) {
    return undefined;
  }

  try {
    const data = await db
      .select({
        source: visits.source,
        visits: sql`COUNT(*)`.as("visits"),
      })
      .from(visits)
      .where(sql`${visits.domain} = ${params.website}`)
      .groupBy(visits.source)
      .orderBy(sql`COUNT(*) DESC`);

    console.log("SOURCE VISITS  =", data);

    return data;
  } catch (error) {
    console.error(error);
  }
}
