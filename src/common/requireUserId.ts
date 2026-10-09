import { Request } from "express";
import { AppError } from "./AppError";
export const requireUserId = (req: Request): string => {
  const id = req.user.id as string;
  if (!id) {
    throw new AppError(" UNAUTHORIZED", 401);
  }
  return id;
};
