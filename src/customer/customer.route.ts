import { Router } from "express";
import { Authenticate } from "../middleware/auth.middleware";
import { CustomerController } from "./customer.controller";
import { Validate } from "../middleware/validate.middleware";
import {
  createCustomerSchema,
  customerParamsIdSchema,
  updateCustomerSchema,
} from "./customerDTO";

const customerRouter = Router();

customerRouter.post(
  "/",
  Authenticate,
  Validate(createCustomerSchema, "body"),
  CustomerController.createCustomer,
);
customerRouter.get("/", Authenticate, CustomerController.getAllCustomer);

customerRouter.delete(
  "/:id",
  Authenticate,
  Validate(customerParamsIdSchema, "params"),
  CustomerController.deleteCustomer,
);

customerRouter.patch(
  "/:id",
  Authenticate,
  Validate(customerParamsIdSchema, "params"),
  Validate(updateCustomerSchema, "body"),
  CustomerController.updateCustomer,
);

export default customerRouter;
