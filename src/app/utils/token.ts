import config from "../config";
import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";

export const createToken = (
  email: string,
  role: string,
  userId: string,
  expiredTime: string
) => {
  return jwt.sign(
    { email, userType: role, userId },
    config.secret as string,
    { expiresIn: expiredTime } as SignOptions
  );
};

export const decodeToken = (token: string, secretKey: string) => {
  return jwt.verify(token, secretKey) as JwtPayload;
};
