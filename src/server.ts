import cors from "cors";
import express, { type Request, type Response } from "express";
import { toNodeHandler } from "better-auth/node";
import { auth } from "../lib/auth";
import { errorHandler } from "./middleware/error.middleware";
import customerRoutes from "./customer/customer.route";
const app = express();

app.use(cors());

//betterauth
app.all("/api/auth/*splat", toNodeHandler(auth));

app.use(express.json());

//routes
app.use("/api/v1/customer", customerRoutes);

app.get("/health", (_req: Request, res: Response) => {
  res.json({ status: "ok" });
});
app.use(errorHandler);

export default app;
