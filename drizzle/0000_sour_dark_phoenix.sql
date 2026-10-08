CREATE TYPE "public"."paymentMethod" AS ENUM('cash', 'esewa', 'khatli', 'bank');--> statement-breakpoint
CREATE TABLE "account" (
	"id" text PRIMARY KEY NOT NULL,
	"account_id" text NOT NULL,
	"provider_id" text NOT NULL,
	"user_id" text NOT NULL,
	"access_token" text,
	"refresh_token" text,
	"id_token" text,
	"access_token_expires_at" timestamp,
	"refresh_token_expires_at" timestamp,
	"scope" text,
	"password" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "session" (
	"id" text PRIMARY KEY NOT NULL,
	"expires_at" timestamp NOT NULL,
	"token" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL,
	"ip_address" text,
	"user_agent" text,
	"user_id" text NOT NULL,
	"impersonated_by" text,
	CONSTRAINT "session_token_unique" UNIQUE("token")
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"email_verified" boolean DEFAULT false NOT NULL,
	"image" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"role" text,
	"banned" boolean DEFAULT false,
	"ban_reason" text,
	"ban_expires" timestamp,
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "verification" (
	"id" text PRIMARY KEY NOT NULL,
	"identifier" text NOT NULL,
	"value" text NOT NULL,
	"expires_at" timestamp NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "credit_items" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"shop_owner_id" text NOT NULL,
	"credit_id" uuid NOT NULL,
	"item_name" varchar(150) NOT NULL,
	"quantity" numeric(10, 2),
	"unit_price" numeric(12, 2),
	"amount" numeric(12, 2) NOT NULL,
	"note" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "credits" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"shopowner_id" text NOT NULL,
	"customer_id" uuid NOT NULL,
	"totalAmount" numeric(12, 2) NOT NULL,
	"entry_date" date NOT NULL,
	"description" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "customers" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(100) NOT NULL,
	"shop_owner_id" text NOT NULL,
	"phone" varchar(10) NOT NULL,
	"address" varchar(150) NOT NULL,
	"credit_limit" numeric(10, 2) NOT NULL,
	"credit_balance" numeric(10, 2) DEFAULT '0.00',
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"image" text
);
--> statement-breakpoint
CREATE TABLE "payments" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"shop_owner_id" text NOT NULL,
	"customer_id" uuid NOT NULL,
	"amount" numeric(12, 2) NOT NULL,
	"payment_date" date NOT NULL,
	"payment_method" "paymentMethod" NOT NULL,
	"reference_no" text,
	"note" text,
	"created_by" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "account" ADD CONSTRAINT "account_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "session" ADD CONSTRAINT "session_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "credit_items" ADD CONSTRAINT "credit_items_shop_owner_id_user_id_fk" FOREIGN KEY ("shop_owner_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "credit_items" ADD CONSTRAINT "credit_items_credit_id_credits_id_fk" FOREIGN KEY ("credit_id") REFERENCES "public"."credits"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "credits" ADD CONSTRAINT "credits_shopowner_id_user_id_fk" FOREIGN KEY ("shopowner_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "customers" ADD CONSTRAINT "customers_shop_owner_id_user_id_fk" FOREIGN KEY ("shop_owner_id") REFERENCES "public"."user"("id") ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "payments" ADD CONSTRAINT "payments_shop_owner_id_user_id_fk" FOREIGN KEY ("shop_owner_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "payments" ADD CONSTRAINT "payments_customer_id_customers_id_fk" FOREIGN KEY ("customer_id") REFERENCES "public"."customers"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
CREATE INDEX "account_userId_idx" ON "account" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "session_userId_idx" ON "session" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "verification_identifier_idx" ON "verification" USING btree ("identifier");--> statement-breakpoint
CREATE INDEX "idx_creditItems_creditId" ON "credit_items" USING btree ("credit_id");--> statement-breakpoint
CREATE INDEX "idx_creditItems_shopOwnerId" ON "credit_items" USING btree ("shop_owner_id");--> statement-breakpoint
CREATE INDEX "idx_shopownerid_cusid" ON "credits" USING btree ("customer_id","shopowner_id");--> statement-breakpoint
CREATE UNIQUE INDEX "idx_unique_shopownerId_phone" ON "customers" USING btree ("phone","shop_owner_id");--> statement-breakpoint
CREATE INDEX "idx_shopownerId_status" ON "customers" USING btree ("shop_owner_id","is_active");--> statement-breakpoint
CREATE INDEX "idx_payments_shopOwnerId" ON "payments" USING btree ("shop_owner_id");--> statement-breakpoint
CREATE INDEX "idx_payments_shopOwnerId_customerId" ON "payments" USING btree ("shop_owner_id","customer_id");--> statement-breakpoint
CREATE INDEX "idx_payments_shopOwnerId_paymentDate" ON "payments" USING btree ("shop_owner_id","payment_date");