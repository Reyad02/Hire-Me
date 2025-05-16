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

const updateJobs = async (jobId: string, payload: Partial<IJobs>) => {
  const job = await jobs.findById(jobId);
  if (!job) {
    throw Error("Job not found");
  }

  const updatedJob = await jobs.findByIdAndUpdate(jobId, payload, {
    new: true,
  });
  return updatedJob;
};

const deleteJobs = async (jobId: string) => {
  const job = await jobs.findById(jobId);
  if (!job) {
    throw Error("Job not found");
  }

  const deletedJob = await jobs.findByIdAndDelete(jobId, {
    new: true,
  });
  return deletedJob;
};

const getJob = async (jobId: string) => {
  const job = await jobs.findById(jobId).populate("postedBy");
  if (!job) {
    throw Error("Job not found");
  }

  return job;
};

const getAllJobs = async () => {
  const allJobs = await jobs.find().populate("postedBy");
  if (allJobs.length < 1) {
    throw Error("Jobs not found");
  }

  return allJobs;
};

export const jobsServices = {
  createJobs,
  updateJobs,
  deleteJobs,
  getJob,
  getAllJobs,
};
