import { Router } from "express";
import { jobsControllers } from "./jobs.controller";

const jobsRoutes = Router();

jobsRoutes.post(
  "/creation",
  jobsControllers.createJobs
);

export default jobsRoutes;