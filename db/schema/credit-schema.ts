import {
  check,
  date,
  index,
  numeric,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { user } from "./auth-schema";
import { varchar } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const credits = pgTable(
  "credits",
  {
    id: uuid().defaultRandom().primaryKey().notNull(),
    shopOwnerId: text("shopowner_id")
      .notNull()
      .references(() => user.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    customerId: uuid("customer_id").notNull(),
    totalAmount: numeric({ precision: 12, scale: 2 }).notNull(),
    entryDate: date("entry_date").notNull(),
    description: text(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { mode: "string" })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index("idx_shopownerid_cusid").on(table.customerId, table.shopOwnerId),
  ],
);

export const creditItems = pgTable(
  "credit_items",
  {
    id: uuid().defaultRandom().primaryKey().notNull(),
    shopOwnerId: text("shop_owner_id")
      .notNull()
      .references(() => user.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    creditId: uuid("credit_id")
      .notNull()
      .references(() => credits.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    itemName: varchar("item_name", { length: 150 }).notNull(),
    quantity: numeric({ precision: 10, scale: 2 }),
    unitPrice: numeric("unit_price", { precision: 12, scale: 2 }),
    amount: numeric({ precision: 12, scale: 2 }).notNull(),
    note: text(),
    createdAt: timestamp("created_at", { mode: "string" })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { mode: "string" })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index("idx_creditItems_creditId").on(table.creditId),
    index("idx_creditItems_shopOwnerId").on(table.shopOwnerId),
    check("total-amount", sql`${table.amount} > 0`),
    check(
      "qty_price_totalamt",
      sql`${table.quantity} * ${table.unitPrice} = ${table.amount}`,
    ),
  ],
);
