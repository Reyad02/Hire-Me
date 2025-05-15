import config from "../config";
import { IUser } from "../modules/user/user.interface";
import jwt, { SignOptions } from "jsonwebtoken";
import { jwtDecode } from "jwt-decode";

export const createToken = (userInfo: Partial<IUser>, expiredTime: string) => {
  return jwt.sign(
    { email: userInfo.email, userType: userInfo.role },
    config.secret as string,
    { expiresIn: expiredTime } as SignOptions
  );
};

export const decodeToken = (token: string) => {
  return jwtDecode(token);
};