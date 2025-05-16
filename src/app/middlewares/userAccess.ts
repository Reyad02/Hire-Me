import { Request, Response, NextFunction } from "express";
import { JwtPayload } from "jsonwebtoken";
import { decodeToken } from "../utils/token";
import user from "../modules/user/user.model";
import { RoleType } from "../types/userRole";

const userAccess = (...requiredRoles: RoleType[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization;

      if (!token) {
        throw Error("You are not authorized!");
      }

      const decoded = decodeToken(token) as JwtPayload;

      const { email, userType } = decoded;

      const isUserExist = await user.findOne({ email: email });
      if (!isUserExist) {
        throw Error("This user is not found!");
      }

      if (requiredRoles.length && !requiredRoles.includes(userType)) {
        throw Error("You are not authorized!");
      }

      req.loggedUser = decoded as JwtPayload;
      next();
    } catch (err: any) {
      res.json({
        success: false,
        message: err?.message,
        stack: err?.stack,
      });
    }
  };
};

export default userAccess;
