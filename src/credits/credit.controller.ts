import { NextFunction, Request, Response } from "express";
import { AppError } from "../common/AppError";
import { requireUserId } from "../common/requireUserId";

export const CreditController = {
  async createCredit(req: Request, res: Response, next: NextFunction) {
    try {
      const shopOwnerId = requireUserId(req);
    } catch (error) {}
  },
};
