import { uniqueIndex, index } from "drizzle-orm/pg-core";
import { decimal, varchar } from "drizzle-orm/pg-core";
import { boolean, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { user } from "./auth-schema";


export const customers = pgTable(
  "customers",
  {
    id: uuid().defaultRandom().primaryKey().notNull(),
    name: varchar("name", { length: 100 }).notNull(),
    shopOwnerId: text("shop_owner_id")
      .notNull()
      .references(() => user.id, {
        onDelete: "restrict",
        onUpdate: "cascade",
      }),
    phone: varchar("phone", { length: 10 }).notNull(),
    address: varchar("address", { length: 150 }).notNull(),
    creditLimit: decimal("credit_limit", { precision: 10, scale: 2 }).notNull(),
    creditBalance: decimal("credit_balance", {
      precision: 10,
      scale: 2,
    }).default("0.00"),
    isActive: boolean("is_active").default(true).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .notNull()
      .$onUpdate(() => new Date()),
    image: text("image"),
  },
  (table) => [
    uniqueIndex("idx_unique_shopownerId_phone").on(
      table.phone,
      table.shopOwnerId,
    ),
    index("idx_shopownerId_status").on(table.shopOwnerId, table.isActive),
  ],
);
