ALTER TABLE "events" DROP CONSTRAINT "events_user_id_user_id_fk";
--> statement-breakpoint
ALTER TABLE "feedbacks" DROP CONSTRAINT "feedbacks_user_id_user_id_fk";
--> statement-breakpoint
ALTER TABLE "events" DROP COLUMN "user_id";--> statement-breakpoint
ALTER TABLE "feedbacks" DROP COLUMN "user_id";