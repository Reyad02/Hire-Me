import { JwtPayload } from "jsonwebtoken";
import { sendPdf } from "../../utils/sendPdf";
import jobs from "../jobs/jobs.model";
import { IJobApplication } from "./jobApplication.interface";
import jobApplication from "./jobApplication.model";
import user from "../user/user.model";
import mongoose from "mongoose";

const jobApply = async (file: any, applicationInfo: IJobApplication) => {
  const isJobExist = await jobs.findById(applicationInfo.job);
  if (!isJobExist) {
    throw Error("This job is not found!");
  }

  const alreadyApplied = await jobApplication.findOne({
    job: applicationInfo.job,
    applicant: applicationInfo.applicant,
    paymentStatus: "paid",
  });
  if (alreadyApplied) {
    throw Error("You have already applied for this job.");
  }

  const { secure_url } = await sendPdf(
    `${applicationInfo.transactionId}_pdf`,
    file?.path
  );
  applicationInfo.resume = secure_url;
  applicationInfo.paymentStatus = "paid";
  applicationInfo.amount = applicationInfo.amount || 100;

  const result = await jobApplication.create(applicationInfo);
  return result;
};

const updateJobApply = async (
  application_id: string,
  payload: Partial<IJobApplication>,
  employee: JwtPayload
) => {
  const appliedJob = await jobApplication.findById(application_id);
  if (!appliedJob) {
    throw Error("Application not found");
  }

  const isUserExist = await user.findById(appliedJob.applicant);
  if (!isUserExist) {
    throw Error("Applicant is not valid");
  }

  const isJobExist = await jobs.findById(appliedJob.job);
  if (!isJobExist) {
    throw Error("Job is not valid");
  }

  if (employee?.userType !== "admin") {
    if (String(isJobExist.postedBy) !== employee?.userId) {
      throw Error("You are not the creator of this job");
    }
  }
  const updatedJobApplication = await jobApplication.findByIdAndUpdate(
    application_id,
    payload,
    {
      new: true,
    }
  );
  return updatedJobApplication;
};

const getAllApplication = async (status: string) => {
  const filter: Record<string, any> = {};
  if (status) {
    filter.status = status;
  }
  const isJobApplicationExist = await jobApplication
    .find(filter)
    .populate("job")
    .populate("applicant");
  if (isJobApplicationExist.length < 1) {
    throw Error("Application not found");
  }

  return isJobApplicationExist;
};

const getMyApplications = async (loggedInUserInfo: JwtPayload) => {
  const isJobApplicationExist = await jobApplication
    .find({ applicant: loggedInUserInfo?.userId })
    .populate("job");
  if (isJobApplicationExist.length < 1) {
    throw Error("Application not found");
  }

  return isJobApplicationExist;
};

const getMyCreateJob = async (loggedInUserInfo: JwtPayload) => {
  const result = await jobApplication.aggregate([
    {
      $lookup: {
        from: "jobs",
        localField: "job",
        foreignField: "_id",
        as: "job",
      },
    },
    { $unwind: "$job" },

    {
      $match: {
        "job.postedBy": new mongoose.Types.ObjectId(loggedInUserInfo.userId),
      },
    },

    {
      $lookup: {
        from: "users",
        localField: "job.postedBy",
        foreignField: "_id",
        as: "job.postedBy",
      },
    },
    { $unwind: "$job.postedBy" },
  ]);

  if (!result.length) {
    throw new Error("No applications found for your jobs.");
  }

  return result;
};

export const jobApplicationServices = {
  jobApply,
  updateJobApply,
  getAllApplication,
  getMyApplications,
  getMyCreateJob,
};
