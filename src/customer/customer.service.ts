import { NextFunction, Request, Response } from "express";
import {
  createCustomerDTO,
  getAllCustomerType,
  updateCustomerDTO,
} from "./customerDTO";
import { db } from "../../db";
import { customers } from "../../db/schema";
import { eq, and, or, ilike, count, desc } from "drizzle-orm";
import { AppError } from "../common/AppError";
import { parsePage, parsePerPage } from "../../utils/pagination";
export const CustomerService = {
  async createCustomer(data: createCustomerDTO, shopOwnerId: string) {
    const isExisting = await db
      .select({
        id: customers.id,
      })
      .from(customers)
      .where(
        and(
          eq(customers.shopOwnerId, shopOwnerId),
          eq(customers.phone, data.phone),
        ),
      )
      .limit(1);

    if (isExisting.length > 0) {
      throw new AppError("Customer already exist with this phone number", 409);
    }
    await db.insert(customers).values({
      ...data,
      shopOwnerId,
    });
  },

  async getAllCustomer(data: getAllCustomerType, shopOwnerId: string) {
    // const { search, perpage, page, shopOwnerId } = data;
    const perpage = parsePerPage(data.perpage);
    const page = parsePage(data.page);
    const search = data.search?.trim() || undefined;

    const whereClause = search
      ? and(
          eq(customers.shopOwnerId, shopOwnerId),
          eq(customers.isActive, true),
          or(
            ilike(customers.name, `%${search}%`),
            ilike(customers.phone, `%${search}%`),
          ),
        )
      : and(
          eq(customers.shopOwnerId, shopOwnerId),
          eq(customers.isActive, true),
        );

    const offset = (page - 1) * perpage;

    const [rows, totalResult] = await Promise.all([
      db
        .select()
        .from(customers)
        .where(whereClause)
        .limit(perpage)
        .offset(offset)
        .orderBy(desc(customers.createdAt)),

      db.select({ count: count() }).from(customers).where(whereClause),
    ]);

    const total = Number(totalResult[0]?.count ?? 0);

    return {
      customers: rows,
      meta: {
        page,
        perpage,
        total,
        totalPages: Math.ceil(total / perpage),
      },
    };
  },

  async deleteCustomer(shopOwnerId: string, customerId: string) {
    const [isExisting] = await db
      .select({
        id: customers.id,
      })
      .from(customers)
      .where(
        and(
          eq(customers.shopOwnerId, shopOwnerId),
          eq(customers.id, customerId),
        ),
      )
      .limit(1);

    if (!isExisting) {
      throw new AppError("Customer didnot exists", 404);
    }

    await db
      .update(customers)
      .set({
        isActive: false,
      })
      .where(
        and(
          eq(customers.id, customerId),
          eq(customers.shopOwnerId, shopOwnerId),
        ),
      );
  },

  async updateCustomer(
    data: updateCustomerDTO,
    customerId: string,
    shopOwnerId: string,
  ) {
    const [isExisting] = await db
      .select({
        id: customers.id,
      })
      .from(customers)
      .where(
        and(
          eq(customers.shopOwnerId, shopOwnerId),
          eq(customers.id, customerId),
        ),
      )
      .limit(1);

    if (!isExisting) {
      throw new AppError("Customer didnot exists", 404);
    }

    if (Object.keys(data).length === 0) {
      throw new AppError("Nothing to update!", 204);
    }

    if (data.phone) {
      const isPhoneNoUsed = await db
        .select({
          id: customers.id,
        })
        .from(customers)
        .where(
          and(
            eq(customers.shopOwnerId, shopOwnerId),

            eq(customers.phone, data.phone),
          ),
        )
        .limit(1);
      if (isPhoneNoUsed[0].id) {
        throw new AppError("This phone number is already used", 409);
      }
    }

    await db
      .update(customers)
      .set({
        name: data.name,
        address: data.address,
        image: data.image,
        phone: data.phone,
        creditLimit: data.creditLimit,
      })
      .where(
        and(
          eq(customers.id, customerId),
          eq(customers.shopOwnerId, shopOwnerId),
        ),
      );
  },
};
