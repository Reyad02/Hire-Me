import { Router } from "express";
import { jobsControllers } from "./jobs.controller";
import userAccess from "../../middlewares/userAccess";

const jobsRoutes = Router();

jobsRoutes.post(
  "/creation",
  userAccess("admin", "user"),
  jobsControllers.createJobs
);
jobsRoutes.put(
  "/:jobId",
  userAccess("admin", "user"),
  jobsControllers.updateJobs
);
jobsRoutes.delete(
  "/:jobId",
  userAccess("admin", "user"),
  jobsControllers.deleteJobs
);
jobsRoutes.get("/:jobId", jobsControllers.getJob);
jobsRoutes.get("/", jobsControllers.getAllJobs);

export default jobsRoutes;
