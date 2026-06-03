ALTER TABLE "tasks" ALTER COLUMN "completed" SET DEFAULT false;--> statement-breakpoint
ALTER TABLE "tasks" ADD COLUMN "updateAt" timestamp with time zone DEFAULT now() NOT NULL;