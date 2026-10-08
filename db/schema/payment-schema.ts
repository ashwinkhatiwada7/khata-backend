import {
  pgTable,
  uuid,
  text,
  decimal,
  date,
  timestamp,
  index,
} from "drizzle-orm/pg-core";
import { customers } from "./customer-schema";
import { pgEnum } from "drizzle-orm/pg-core";
import { user } from "./auth-schema";

export const PaymentMethod = pgEnum("paymentMethod", [
  "cash",
  "esewa",
  "khatli",
  "bank",
]);

export const payments = pgTable(
  "payments",
  {
    id: uuid().defaultRandom().primaryKey().notNull(),
    shopOwnerId: text("shop_owner_id")
      .notNull()
      .references(() => user.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),

    customerId: uuid("customer_id")
      .notNull()
      .references(() => customers.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    amount: decimal({ precision: 12, scale: 2 }).notNull(),
    paymentDate: date("payment_date").notNull(),
    paymentMethod: PaymentMethod("payment_method").notNull(),
    referenceNo: text("reference_no"),
    note: text(),
    createdBy: text("created_by").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => [
    index("idx_payments_shopOwnerId").on(table.shopOwnerId),
    index("idx_payments_shopOwnerId_customerId").on(
      table.shopOwnerId,
      table.customerId,
    ),
    index("idx_payments_shopOwnerId_paymentDate").on(
      table.shopOwnerId,
      table.paymentDate,
    ),
  ],
);
