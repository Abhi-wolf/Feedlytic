import { pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const events = pgTable("events", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  domain: text("domain").notNull(),
  eventName: text("eventName").notNull(),
  eventDescription: text("eventDescription"),
  createdAt: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
});
