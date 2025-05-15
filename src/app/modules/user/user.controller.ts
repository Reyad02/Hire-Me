import { Request, Response } from "express";
import { userValidation } from "./user.validation";
import { userServices } from "./user.service";

const registerUser = async (req: Request, res: Response) => {
  try {
    const validateUserInfo = userValidation.parse(req?.body);
    const result = await userServices.registrationUser(validateUserInfo);
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: result,
    });
  } catch (err: any) {
    res.json({
      success: false,
      message: err?.message,
      stack: err?.stack,
    });
  }
};

export const userControllers = {
  registerUser,
};