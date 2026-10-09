import { Router } from "express";
import { Validate } from "../middleware/validate.middleware";
import { customerParamsIdSchema } from "../customer/customerDTO";
import { Authenticate } from "../middleware/auth.middleware";
import { createCreditSchema } from "./creditDTO";

const creditRouter = Router();

creditRouter.post(
  "/customer/:id/credit",
  Authenticate,
  Validate(customerParamsIdSchema, "params"),
  Validate(createCreditSchema, "body"),
);

creditRouter.get("/customer/:id/credit");
