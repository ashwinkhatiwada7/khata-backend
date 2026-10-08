import { db } from "../../db";
import { customers } from "../../db/schema";
import { eq, and } from "drizzle-orm";

type Tx = Parameters<Parameters<typeof db.transaction>[0]>[0];
export type DbExecutor = typeof db | Tx;

export async function findActiveCustomer(
  shopOwnerId: string,
  customerId: string,
  executor: DbExecutor = db,
) {
  const [customer] = await executor
    .select()
    .from(customers)
    .where(
      and(
        eq(customers.id, customerId),
        eq(customers.shopOwnerId, shopOwnerId),
        eq(customers.isActive, true),
      ),
    )
    .limit(1);

  return customer;
}
