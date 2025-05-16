import { JwtPayload } from "jsonwebtoken";
import { sendPdf } from "../../utils/sendPdf";
import jobs from "../jobs/jobs.model";
import { IJobApplication } from "./jobApplication.interface";
import jobApplication from "./jobApplication.model";
import user from "../user/user.model";

const jobApply = async (file: any, applicationInfo: IJobApplication) => {
  const isJobExist = await jobs.findById(applicationInfo.job);
  if (!isJobExist) {
    throw Error("This job is not found!");
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

export const jobApplicationServices = {
  jobApply,
  updateJobApply,
};
