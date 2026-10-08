import { BetterUser } from "./lib/auth";
declare global {
  namespace Express {
    interface Request {
      user?: BetterUser;
    }
  }
}
