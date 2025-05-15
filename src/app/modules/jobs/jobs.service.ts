import user from "../user/user.model";
import { IJobs } from "./jobs.interface";
import jobs from "./jobs.model";

const createJobs = async (jobDetails: IJobs) => {
  const isUserExist = await user.findById(jobDetails?.postedBy);
  if (!isUserExist) {
    throw Error("User is not valid");
  }
  const result = await jobs.create(jobDetails);
  return result;
};

export const jobsServices = {
  createJobs,
};
