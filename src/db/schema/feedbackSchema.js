import { numeric, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const feedbacks = pgTable("feedbacks", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  domain: text("domain").notNull(),
  rating: numeric("rating").default(0),
  userName: text("userName").notNull(),
  feedback: text("feedback").notNull(),
  createdAt: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
});
