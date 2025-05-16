import { sendPdf } from "../../utils/sendPdf";
import jobs from "../jobs/jobs.model";
import { IJobApplication } from "./jobApplication.interface";
import jobApplication from "./jobApplication.model";

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
  applicationInfo.amount = 100;

  const result = await jobApplication.create(applicationInfo);
  return result;
};

export const jobApplicationServices = {
  jobApply,
};
