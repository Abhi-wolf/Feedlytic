ALTER TABLE "pageviews" DROP CONSTRAINT "pageviews_domain_id_websites_id_fk";
--> statement-breakpoint
ALTER TABLE "visits" DROP CONSTRAINT "visits_domain_id_websites_id_fk";
--> statement-breakpoint
ALTER TABLE "pageviews" DROP COLUMN "domain_id";--> statement-breakpoint
ALTER TABLE "visits" DROP COLUMN "domain_id";