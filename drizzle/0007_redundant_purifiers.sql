ALTER TABLE "feedbacks" DROP CONSTRAINT "feedbacks_domain_unique";--> statement-breakpoint
ALTER TABLE "feedbacks" ALTER COLUMN "domain" SET NOT NULL;