import { Request, Response } from "express";
import { jobsValidation } from "./jobs.validation";
import { jobsServices } from "./jobs.service";
import mongoose, { Schema } from "mongoose";

const createJobs = async (req: Request, res: Response) => {
  try {
    const validateJobDetails = jobsValidation.parse(req?.body);
    const updatedJobDetails = {
      ...validateJobDetails,
      postedBy: new mongoose.Types.ObjectId(validateJobDetails?.postedBy),
    };
    const result = await jobsServices.createJobs(updatedJobDetails);
    res.status(201).json({
      success: true,
      message: "Jobs created successfully",
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

export const jobsControllers = {
  createJobs,
};
