import { NextFunction, Request, Response } from "express";
import { AppError } from "../common/AppError";

export const errorHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const statusCode = "statusCode" in err ? err.statusCode : 500;
  const message = err.message || "Something went wrong!";
  const fieldErrors = "fieldErrors" in err ? err.fieldErrors : undefined;
  console.log(
    `statusCode:${statusCode} || message:${message} || fieldError:${fieldErrors}`,
  );
  return res.status(statusCode).json({
    success: false,
    message: message,
    ...(fieldErrors && { fieldErrors: fieldErrors }),
  });
};
