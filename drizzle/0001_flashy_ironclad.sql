ALTER TABLE "user" ADD COLUMN "shop_name" text NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "location" text NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "phone" text NOT NULL;--> statement-breakpoint
ALTER TABLE "credit_items" ADD CONSTRAINT "total-amount" CHECK ("credit_items"."amount" > 0);--> statement-breakpoint
ALTER TABLE "credit_items" ADD CONSTRAINT "qty_price_totalamt" CHECK ("credit_items"."quantity" * "credit_items"."unit_price" = "credit_items"."amount");