import { fromNodeHeaders } from "better-auth/node";
import { Response, Request, NextFunction } from "express";
import { auth } from "../../lib/auth";

export const Authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const session = await auth.api.getSession({
      headers: await fromNodeHeaders(req.headers),
    });

    if (!session?.user) {
      return res.status(401).json({
        success: true,
        message: "UNAUTHORIZED",
      });
    }

    req.user = session?.user;
    next();
  } catch (error) {
    next(error);
  }
};
