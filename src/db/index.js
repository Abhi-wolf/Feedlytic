import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

let sslMode = "require";
if (process.env.NODE_ENV === "development") {
  sslMode = "disable";
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

export const db = drizzle(pool, { logger: false });
// export const db = drizzle(pool, { logger: true });

export * from "drizzle-orm";

// import { drizzle } from "drizzle-orm/neon-http";
// import { neon } from "@neondatabase/serverless";

// const sql = neon(process.env.DATABASE_URL);
// export const db = drizzle({ client: sql });

// export * from "drizzle-orm";
