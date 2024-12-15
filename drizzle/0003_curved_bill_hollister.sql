ALTER TABLE "websites" ALTER COLUMN "domain" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "websites" ADD CONSTRAINT "websites_domain_unique" UNIQUE("domain");