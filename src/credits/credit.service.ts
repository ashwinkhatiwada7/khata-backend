import { NextFunction, Request, Response } from "express";
import { createCreditDTO } from "./creditDTO";
import { findActiveCustomer } from "../customer/customer.repository";
import { AppError } from "../common/AppError";

export const creditService = {
  async createCredit({
    data,
    shopOwnerId,
    customerId,
  }: {
    data: createCreditDTO;
    shopOwnerId: string;
    customerId: string;
  }) {
    const customer = await findActiveCustomer(shopOwnerId, customerId);
    if (!customer) {
      throw new AppError("Customer not found", 404);
    }

    const totalAmount = data.items.reduce((acc, item) => {
      const total = acc + Number(item.quantity) * Number(item.unitPrice);
      return total.toFixed(2);
    }, 0);
  },
};
