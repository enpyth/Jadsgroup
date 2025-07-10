CREATE TABLE "agents" (
	"agent_id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"phone" text NOT NULL,
	"email" text NOT NULL,
	"agency_name" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "co_workers" (
	"coworker_id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"phone" text NOT NULL,
	"specialization" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "leases" (
	"lease_id" serial PRIMARY KEY NOT NULL,
	"property_id" integer NOT NULL,
	"tenant_email" text NOT NULL,
	"start_date" date NOT NULL,
	"end_date" date NOT NULL,
	"rent_amount" text NOT NULL,
	"deposit_amount" text NOT NULL,
	"state" jsonb NOT NULL,
	"agreement_to_lease" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"application_data" jsonb,
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "maintenance_requests" (
	"request_id" serial PRIMARY KEY NOT NULL,
	"lease_id" integer NOT NULL,
	"issue_description" text NOT NULL,
	"state" varchar(50) DEFAULT 'pending' NOT NULL,
	"request_date" timestamp NOT NULL,
	"coworker_id" integer
);
--> statement-breakpoint
CREATE TABLE "outgoings" (
	"outgoing_id" serial PRIMARY KEY NOT NULL,
	"lease_id" integer NOT NULL,
	"records" jsonb NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "owners" (
	"owner_id" serial PRIMARY KEY NOT NULL,
	"company" jsonb NOT NULL,
	"name" text NOT NULL,
	"phone" text NOT NULL,
	"email" text NOT NULL,
	"address" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "properties" (
	"property_id" serial PRIMARY KEY NOT NULL,
	"owner_id" integer NOT NULL,
	"agent_id" integer NOT NULL,
	"name" text NOT NULL,
	"unit" text NOT NULL,
	"describe" text NOT NULL,
	"size" text NOT NULL,
	"price" text NOT NULL,
	"state" text DEFAULT 'available' NOT NULL,
	"image" text NOT NULL,
	"detail" jsonb NOT NULL,
	"release_time" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "review_records" (
	"review_id" serial PRIMARY KEY NOT NULL,
	"lease_id" integer NOT NULL,
	"content" text NOT NULL,
	"reviewer" text NOT NULL,
	"review_date" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "tenants" (
	"tenant_id" serial NOT NULL,
	"name" text NOT NULL,
	"phone" text NOT NULL,
	"email" text PRIMARY KEY NOT NULL,
	"id_card" text NOT NULL,
	"abn_lookup" text,
	"business_address" text,
	"photo_identification" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "leases" ADD CONSTRAINT "leases_property_id_properties_property_id_fk" FOREIGN KEY ("property_id") REFERENCES "public"."properties"("property_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "leases" ADD CONSTRAINT "leases_tenant_email_tenants_email_fk" FOREIGN KEY ("tenant_email") REFERENCES "public"."tenants"("email") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "maintenance_requests" ADD CONSTRAINT "maintenance_requests_lease_id_leases_lease_id_fk" FOREIGN KEY ("lease_id") REFERENCES "public"."leases"("lease_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "maintenance_requests" ADD CONSTRAINT "maintenance_requests_coworker_id_co_workers_coworker_id_fk" FOREIGN KEY ("coworker_id") REFERENCES "public"."co_workers"("coworker_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "outgoings" ADD CONSTRAINT "outgoings_lease_id_leases_lease_id_fk" FOREIGN KEY ("lease_id") REFERENCES "public"."leases"("lease_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "properties" ADD CONSTRAINT "properties_owner_id_owners_owner_id_fk" FOREIGN KEY ("owner_id") REFERENCES "public"."owners"("owner_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "properties" ADD CONSTRAINT "properties_agent_id_agents_agent_id_fk" FOREIGN KEY ("agent_id") REFERENCES "public"."agents"("agent_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "review_records" ADD CONSTRAINT "review_records_lease_id_leases_lease_id_fk" FOREIGN KEY ("lease_id") REFERENCES "public"."leases"("lease_id") ON DELETE no action ON UPDATE no action;