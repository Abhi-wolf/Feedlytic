ALTER TABLE "visits" ADD COLUMN "os" text DEFAULT 'unknown' NOT NULL;--> statement-breakpoint
ALTER TABLE "visits" ADD COLUMN "device" text DEFAULT 'unknown' NOT NULL;--> statement-breakpoint
ALTER TABLE "visits" ADD COLUMN "browser" text DEFAULT 'unknown' NOT NULL;--> statement-breakpoint
ALTER TABLE "visits" ADD COLUMN "timezone" text DEFAULT 'unknown' NOT NULL;