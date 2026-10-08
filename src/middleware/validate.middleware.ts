import { NextFunction, Request, Response } from "express";
import z from "zod";
import { AppError } from "../common/AppError";

export const Validate = (
  schema: z.ZodType,
  source: "body" | "params" | "query",
) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req[source];
      const parsed = schema.safeParse(data);

      if (!parsed.success) {
        const { fieldErrors } = z.flattenError(parsed.error);
        const validationError = new AppError("Invalid Data", 402, fieldErrors);
        return next(validationError);
      }

      req[source] = parsed.data;
      next();
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
};
