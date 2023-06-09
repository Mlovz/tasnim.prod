import { Request, Response, NextFunction } from "express";
import AppError from "../utils/appError";
import catchAsync from "../utils/catchAsync";
import jwt from "jsonwebtoken";
import User from "../models/userModel";

export const auth = {
  protect: catchAsync(
    async (req: Request | any, res: Response, next: NextFunction) => {
      // 1) Getting token and check of it's there
      let token;
      if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
      ) {
        token = req.headers.authorization.split(" ")[1];
      } else if (req.cookies.jwt) {
        token = req.cookies.jwt;
      }

      if (!token) {
        return next(
          new AppError(
            "You are not logged in! Please log in to get access.",
            401
          )
        );
      }

      // 2) Verification token
      const decoded: any = await jwt.verify(
        token,
        `${process.env.ACCESS_TOKEN_SECRET}`
      );

      const newId = decoded._id || decoded.id

      // 3) Check if user still exists
      const currentUser = await User.findById(newId);
      if (!currentUser) {
        return next(
          new AppError(
            "The user belonging to this token does no longer exist.",
            401
          )
        );
      }

      req.user = currentUser;
      res.locals.user = currentUser;
      next();
    }
  ),
  restrictTo: (...roles: string[]) => {
    return (req: Request | any, res: Response, next: NextFunction) => {
      // roles ['admin', 'lead-guide']. role='user'
      if (!roles.includes(req.user.role)) {
        return next(
          new AppError("You do not have permission to perform this action", 403)
        );
      }

      next();
    };
  },
};
