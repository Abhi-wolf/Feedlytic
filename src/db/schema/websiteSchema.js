import {
  boolean,
  timestamp,
  pgTable,
  text,
  primaryKey,
  integer,
  sql,
  pgEnum,
} from "drizzle-orm/pg-core";
import { users } from "@/db/schema/authSchema";

export const websites = pgTable("websites", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  domain: text("domain").unique(),
  apiKey: text("apiKey").unique(),
  status: text("status").default("active"),
  userId: text("user_id").references(() => users.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "string" }).notNull().defaultNow(),
});

export const pageViews = pgTable("pageviews", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  domain: text("domain").notNull(),
  page: text("page").notNull(),
  createdAt: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "string" }).notNull().defaultNow(),
});

export const visits = pgTable("visits", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  domain: text("domain").notNull(),
  os: text("os").notNull().default("windows"),
  source: text("source").notNull().default("direct"),
  country: text("country").notNull().default("unknown"),
  browser: text("browser").notNull().default("Chrome"),
  timezone: text("timezone").notNull().default("unknown"),
  deviceType: text("deviceType").notNull().default("desktop"),
  createdAt: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "string" }).notNull().defaultNow(),
});
