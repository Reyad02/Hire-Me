import { Request, Response } from "express";
import { userUpdateValidation, userValidation } from "./user.validation";
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

const updateUser = async (req: Request, res: Response) => {
  try {
    const { userEmail } = req.params;
    const validateUserInfo = userUpdateValidation.parse(req?.body);
    const result = await userServices.updateUser(userEmail, validateUserInfo);
    res.status(200).json({
      success: true,
      message: "User updated successfully",
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

const deleteUser = async (req: Request, res: Response) => {
  try {
    const { userEmail } = req.params;
    const result = await userServices.deleteUser(userEmail);
    res.status(200).json({
      success: true,
      message: "User deleted successfully",
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

const getUser = async (req: Request, res: Response) => {
  try {
    const { userEmail } = req.params;
    const result = await userServices.getUser(userEmail);
    res.status(200).json({
      success: true,
      message: "User retrieved successfully",
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

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await userServices.getAllUsers();
    res.status(200).json({
      success: true,
      message: "User retrieved successfully",
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
  updateUser,
  deleteUser,
  getUser,
  getAllUsers,
};
