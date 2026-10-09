import z from "zod";

export const balanceSchema = z
  .string()
  .regex(
    /^\d+(\.\d{1,2})?$/,
    "Credit limit must be a valid number with up to 2 decimal places",
  )
  .refine((val) => parseFloat(val) >= 0, {
    message: "Credit limit must be non-negative",
  })
  .refine((val) => parseFloat(val) <= 999999999.99, {
    message: "Credit limit exceeds maximum allowed value",
  });
