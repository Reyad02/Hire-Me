import { Request, Response } from "express";
import { jobsValidation, jobUpdateValidation } from "./jobs.validation";
import { jobsServices } from "./jobs.service";
import mongoose from "mongoose";

const createJobs = async (req: Request, res: Response) => {
  try {
    const validateJobDetails = jobsValidation.parse(req?.body);
    const updatedJobDetails = {
      ...validateJobDetails,
      postedBy: new mongoose.Types.ObjectId(req?.loggedUser?.userId), // logged in user's userId set here
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

const updateJobs = async (req: Request, res: Response) => {
  try {
    const { jobId } = req.params;
    const validateJobDetails = jobUpdateValidation.parse(req?.body);
    const result = await jobsServices.updateJobs(
      jobId,
      validateJobDetails,
      req?.loggedUser
    );
    res.status(200).json({
      success: true,
      message: "Jobs updated successfully",
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

const deleteJobs = async (req: Request, res: Response) => {
  try {
    const { jobId } = req.params;
    const result = await jobsServices.deleteJobs(jobId, req?.loggedUser);
    res.status(200).json({
      success: true,
      message: "Jobs deleted successfully",
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

const getJob = async (req: Request, res: Response) => {
  try {
    const { jobId } = req.params;
    const result = await jobsServices.getJob(jobId);
    res.status(200).json({
      success: true,
      message: "Jobs retrieved successfully",
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

const getAllJobs = async (req: Request, res: Response) => {
  try {
    const { company } = req.query;
    const result = await jobsServices.getAllJobs(company as string);
    res.status(200).json({
      success: true,
      message: "Jobs retrieved successfully",
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
  updateJobs,
  deleteJobs,
  getJob,
  getAllJobs,
};
