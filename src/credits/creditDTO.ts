import z from "zod";
import { balanceSchema } from "../../utils/validator";
const positiveMoney = balanceSchema.refine(
  (v) => parseFloat(v) > 0,
  "Must be greater than 0",
);

export const creditItems = z.object({
  itemName: z
    .string()
    .min(1, "Item name is required")
    .max(150, "Item name must be maximum of 150 characteras"),
  quantity: positiveMoney,
  unitPrice: positiveMoney,
  note: z.string().trim().optional(),
});

export const createCreditSchema = z.object({
  entryDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Use YYYY-MM-DD"),
  description: z.string().optional(),
  items: z.array(creditItems).min(1, "Credit Items are required"),
});

export type createCreditDTO = z.infer<typeof createCreditSchema>;
