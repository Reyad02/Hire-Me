import { Request, Response } from "express";
import { jobApplicationValidation } from "./jobApplication.validation";
import { jobApplicationServices } from "./jobApplication.service";
import mongoose from "mongoose";

const applyJob = async (req: Request, res: Response) => {
  try {
    const validateJobApplication = jobApplicationValidation.parse(req.body);
    const updatedValidateJobApplication = {
      ...validateJobApplication,
      job: new mongoose.Types.ObjectId(validateJobApplication?.job),
      applicant: new mongoose.Types.ObjectId(validateJobApplication?.applicant),
    };
    const result = await jobApplicationServices.jobApply(
      req.file,
      updatedValidateJobApplication
    );
    res.json({
      success: true,
      message: "Applied Successfully successfully",
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

export const jobApplicantsControllers = {
  applyJob,
};
