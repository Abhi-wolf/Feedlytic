CREATE TABLE "events" (
	"id" text PRIMARY KEY NOT NULL,
	"domain" text NOT NULL,
	"eventName" text NOT NULL,
	"eventDescription" text,
	"user_id" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "feedbacks" (
	"id" text PRIMARY KEY NOT NULL,
	"domain" text,
	"userName" text NOT NULL,
	"feedback" text NOT NULL,
	"user_id" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "feedbacks_domain_unique" UNIQUE("domain")
);
--> statement-breakpoint
ALTER TABLE "websites" ADD COLUMN "apiKey" text;--> statement-breakpoint
ALTER TABLE "events" ADD CONSTRAINT "events_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "feedbacks" ADD CONSTRAINT "feedbacks_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "websites" ADD CONSTRAINT "websites_apiKey_unique" UNIQUE("apiKey");