import { NextFunction, Request, Response, Router } from "express";
import { upload } from "../../utils/sendPdf";
import { jobApplicantsControllers } from "./jobApplication.controllers";
import userAccess from "../../middlewares/userAccess";

const jobApplicantsRoutes = Router();

jobApplicantsRoutes.post(
  "/",
  userAccess("job_seeker"),
  upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body?.data);
    next();
  },
  jobApplicantsControllers.applyJob
);

export default jobApplicantsRoutes;
