import { NextFunction, Request, Response } from "express";
import { AppError } from "../common/AppError";
import { CustomerService } from "./customer.service";
import { parsePage, parsePerPage } from "../../utils/pagination";
import { success } from "zod";

export const CustomerController = {
  async createCustomer(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.user?.id;
      if (!id) {
        throw new AppError("UNAUTHORIZED", 401);
      }
      await CustomerService.createCustomer(req.body, id);

      return res.status(201).json({
        success: true,
        message: "customer create successfully",
      });
    } catch (error) {
      next(error);
    }
  },

  async getAllCustomer(req: Request, res: Response, next: NextFunction) {
    try {
      const shopOwnerId = req.user?.id;
      if (!shopOwnerId) {
        throw new AppError("UNAUTHORIZED", 401);
      }

      const page = req.query?.page as string | undefined;
      const perpage = req.query.perpage as string | undefined;
      const search =
        typeof req.query.search === "string" ? req.query.search : undefined;

      const result = await CustomerService.getAllCustomer(
        {
          page,
          perpage,
          search,
        },
        shopOwnerId,
      );

      return res.status(200).json({
        success: true,
        data: result.customers,
        meta: result.meta,
      });
    } catch (error) {
      next(error);
    }
  },
  async getCustomerById(req: Request, res: Response, next: NextFunction) {
    const shopOwnerId = req.user?.id;
    const customerId = req.params?.id as string;
    if (!shopOwnerId) {
      throw new AppError("UNAUTHORIZED", 401);
    }
    try {
      const result = await CustomerService.getCustomerById(
        shopOwnerId,
        customerId,
      );
      return res.status(200).json({
        success: true,
        data: result.customerInfo,
      });
    } catch (error) {
      next(error);
    }
  },
  async updateCustomer(req: Request, res: Response, next: NextFunction) {
    try {
      const shopOwnerId = req.user?.id;
      if (!shopOwnerId) {
        throw new AppError("UNAUTHORIZED", 401);
      }
      const data = req.body;
      const customerId = req.params.id as string;
      await CustomerService.updateCustomer(data, customerId, shopOwnerId);
      return res.status(200).json({
        success: true,
        message: "Updated Successfully",
      });
    } catch (error) {
      next(error);
    }
  },
  async deleteCustomer(req: Request, res: Response, next: NextFunction) {
    try {
      const shopOwnerId = req.user?.id;
      if (!shopOwnerId) {
        throw new AppError("UNAUTHORIZED", 401);
      }

      const customerId = req.params.id as string;

      await CustomerService.deleteCustomer(shopOwnerId, customerId);
      return res.status(200).json({
        success: true,
        message: "Customer deleted Successfully",
      });
    } catch (error) {
      next(error);
    }
  },
};
