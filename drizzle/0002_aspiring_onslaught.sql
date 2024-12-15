CREATE TABLE "pageviews" (
	"id" text PRIMARY KEY NOT NULL,
	"domain" text NOT NULL,
	"page" text NOT NULL,
	"domain_id" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "visits" (
	"id" text PRIMARY KEY NOT NULL,
	"domain" text NOT NULL,
	"source" text DEFAULT 'direct' NOT NULL,
	"domain_id" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "websites" (
	"id" text PRIMARY KEY NOT NULL,
	"domain" text NOT NULL,
	"user_id" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
DROP TABLE "pageview" CASCADE;--> statement-breakpoint
DROP TABLE "visit" CASCADE;--> statement-breakpoint
DROP TABLE "website" CASCADE;--> statement-breakpoint
ALTER TABLE "pageviews" ADD CONSTRAINT "pageviews_domain_id_websites_id_fk" FOREIGN KEY ("domain_id") REFERENCES "public"."websites"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "visits" ADD CONSTRAINT "visits_domain_id_websites_id_fk" FOREIGN KEY ("domain_id") REFERENCES "public"."websites"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "websites" ADD CONSTRAINT "websites_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;