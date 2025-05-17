import { Request, Response } from "express";
import {
  updateJobApplicationValidation,
} from "./jobApplication.validation";
import { jobApplicationServices } from "./jobApplication.service";

const applyJob = async (req: Request, res: Response) => {
  try {
    const { trxId } = req.params;
    const result = await jobApplicationServices.jobApply(req.file, trxId,req.loggedUser?.userId);
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

const payForJob = async (req: Request, res: Response) => {
  const { jobId } = req.params;
  try {
    const result = await jobApplicationServices.paySuccessfully(
      jobId,
      req.loggedUser?.userId
    );
    res.json({
      success: true,
      message: "Payment successfully",
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

const updateAppliedJob = async (req: Request, res: Response) => {
  try {
    const { applicationId } = req.params;
    const validateJobApplication = updateJobApplicationValidation.parse(
      req.body
    );
    const result = await jobApplicationServices.updateJobApply(
      applicationId,
      validateJobApplication,
      req?.loggedUser
    );
    res.json({
      success: true,
      message: "Application accepted successfully",
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

const getMyCreateJob = async (req: Request, res: Response) => {
  try {
    const result = await jobApplicationServices.getMyCreateJob(req.loggedUser);
    res.json({
      success: true,
      message: "Application found successfully",
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

const getMyAppliedJob = async (req: Request, res: Response) => {
  try {
    const result = await jobApplicationServices.getMyApplications(
      req.loggedUser
    );
    res.json({
      success: true,
      message: "Application found successfully",
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

const getAllAppliedJob = async (req: Request, res: Response) => {
  try {
    const { status } = req.query;
    const result = await jobApplicationServices.getAllApplication(
      status as string
    );
    res.json({
      success: true,
      message: "Application found successfully",
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
  updateAppliedJob,
  getAllAppliedJob,
  getMyAppliedJob,
  getMyCreateJob,
  payForJob,
};
