import { JwtPayload } from "jsonwebtoken";
import { sendPdf } from "../../utils/sendPdf";
import jobs from "../jobs/jobs.model";
import { IJobApplication } from "./jobApplication.interface";
import jobApplication from "./jobApplication.model";
import user from "../user/user.model";
import mongoose from "mongoose";
import invoice from "../invoice/invoice.model";

const jobApply = async (file: any, trxId: string, currentUser: string) => {
  const isJobExist = await jobApplication.findOne({ transactionId: trxId });
  if (!isJobExist) {
    throw Error("This not transaction!");
  }

  if (isJobExist?.paymentStatus === "pending") {
    throw Error("pay first");
  }

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { secure_url } = await sendPdf(`${trxId}_pdf`, file?.path);
    const paymentStatus = "paid";
    const resume = secure_url;

    const updatedApplication = await jobApplication.findByIdAndUpdate(
      isJobExist._id,
      {
        resume,
        paymentStatus,
      },
      { new: true, session }
    );

    if (!updatedApplication) {
      throw Error("Failed to send resume");
    }

    const invoiceData = {
      transactionId: trxId,
      user: currentUser,
      job: isJobExist?._id,
      amount: 100,
    };

    await invoice.create([invoiceData], { session });

    await session.commitTransaction();
    session.endSession();

    return {
      success: true,
      message: "Job applied and invoice created successfully",
    };
  } catch (err: any) {
    await session.abortTransaction();
    session.endSession();
    throw new Error(err.message || "Something went wrong");
  }
};

const paySuccessfully = async (jobId: string, loggedApplicant: string) => {
  const isJobExist = await jobs.findById(jobId);
  if (!isJobExist) {
    throw Error("This job is not found!");
  }

  const alreadyApplied = await jobApplication.findOne({
    job: jobId,
    applicant: loggedApplicant,
    paymentStatus: "paid",
  });
  if (alreadyApplied) {
    throw Error("You have already applied for this job.");
  }

  const transactionId = `TXN_${Date.now()}_${Math.floor(
    Math.random() * 10000
  )}`;
  const paymentStatus = "paid";
  const amount = 100;
  const status = "pending";
  const applicant = new mongoose.Types.ObjectId(loggedApplicant);
  const job = new mongoose.Types.ObjectId(jobId);

  const result = await jobApplication.create({
    transactionId,
    paymentStatus,
    amount,
    status,
    applicant,
    job,
  });

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

    {
      $lookup: {
        from: "users",
        localField: "applicant",
        foreignField: "_id",
        as: "applicant",
      },
    },
    { $unwind: "$applicant" },
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
  paySuccessfully,
};
