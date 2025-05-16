import config from "../../config";
import { createToken } from "../../utils/token";
import user from "../user/user.model";
import { IAuth } from "./auth.interface";
import bcrypt from "bcrypt";

const loginUser = async (loginInfo: IAuth) => {
  const isUserExist = await user.findOne({ email: loginInfo?.email });
  if (!isUserExist) {
    throw Error("User doesn't exist");
  }

  const isPassMatch = await bcrypt.compare(
    loginInfo.password,
    isUserExist.password
  );

  if (!isPassMatch) {
    throw Error("Password didn't match");
  }

  const token = createToken(
    isUserExist.email,
    isUserExist.role,
    String(isUserExist._id),
    config.token_expired_time as string
  );

  return token;
};

export const authServices = {
  loginUser,
};
