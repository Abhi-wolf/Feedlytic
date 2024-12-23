"use server";

import { auth } from "@/auth";
import { db, eq } from "@/db";
import { v4 as uuidv4 } from "uuid";
import { pageViews, visits, websites } from "@/db/schema/websiteSchema";
import { revalidatePath } from "next/cache";

export async function addWebsiteAction(input) {
  try {
    if (!input.domain || !input.userId) {
      throw new Error("Domain and userId are required");
    }

    const existingWebsite = await db
      .select()
      .from(websites)
      .where(eq(websites.domain, input.domain));

    if (existingWebsite.length > 0) {
      throw new Error("Website with this domain already exists");
    }

    const [newWebsite] = await db
      .insert(websites)
      .values({
        domain: input.domain,
        userId: input.userId,
      })
      .returning();

    const eventData = {
      eventName: "New domain added",
      domain: process.env.FRONTEND_DOMAIN,
      eventDescription: `New domain ${input.domain} added`,
    };

    const res = await fetch(`${process.env.FEEDLYTIC_API_URL}/events`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.FEEDLYTIC_API_KEY}`,
      },
      body: JSON.stringify(eventData),
    });

    return {
      success: true,
      website: newWebsite,
    };
  } catch (error) {
    console.error("Website creation error:", error);

    return {
      success: false,
      error:
        error instanceof Error ? error.message : "An unexpected error occurred",
    };
  }
}

export async function deleteWebsite({ id }) {
  if (!id) throw new Error("Id is required");

  const web = await db.select().from(websites).where(eq(websites.id, id));

  if (web.length === 0) {
    throw new Error("Website not found");
  }

  const domain = web[0].domain;

  try {
    const res = await db.transaction(async (trx) => {
      await trx.delete(pageViews).where(eq(pageViews.domain, domain));

      await trx.delete(visits).where(eq(visits.domain, domain));

      const deletedWeb = await trx
        .delete(websites)
        .where(eq(websites.domain, domain));

      if (deletedWeb.count === 0)
        throw new Error("Website not found or already deleted.");
    });

    const eventData = {
      eventName: "Domain deleted",
      domain: process.env.FRONTEND_DOMAIN,
      eventDescription: `Domain ${domain} deleted`,
    };

    const temp = await fetch(`${process.env.FEEDLYTIC_API_URL}/events`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.FEEDLYTIC_API_KEY}`,
      },
      body: JSON.stringify(eventData),
    });

    revalidatePath("/dashboard");
    return { success: true, message: "Website deleted successfully" };
  } catch (error) {
    console.error("Error deleting website:", error);
    return {
      success: false,
      error: error.message || "An unexpected error occurred",
    };
  }
}

export async function generateNewApiKey({ params }) {
  const session = await auth();

  try {
    if (!session?.user || !params.website) {
      throw new Error("Unauthorized access");
    }

    const website = await db
      .select()
      .from(websites)
      .where(eq(websites.domain, params.website));

    if (!website.length > 0 || website[0].userId !== session.user.id) {
      throw new Error("Domain does not belong to the user");
    }

    const apiKey = await uuidv4();

    await db
      .update(websites)
      .set({ apiKey })
      .where(eq(websites.domain, params.website));

    return {
      success: true,
      apiKey,
    };
  } catch (error) {
    console.error("Error generating API key:", error.message);
    return {
      success: false,
      error: error.message || "An unexpected error occurred",
    };
  }
}
