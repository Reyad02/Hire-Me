import { NextFunction, Request, Response, Router } from "express";
import { upload } from "../../utils/sendPdf";
import { jobApplicantsControllers } from "./jobApplication.controllers";
import userAccess from "../../middlewares/userAccess";

const jobApplicantsRoutes = Router();

jobApplicantsRoutes.put(
  "/apply/:trxId",
  userAccess("job_seeker"),
  (req: Request, res: Response, next: NextFunction) => {
    upload.single("file")(req, res, function (err: any) {
      if (err) {
        if (err.code === "LIMIT_FILE_SIZE") {
          return res.status(400).json({
            success: false,
            message: "File too large. Max 5MB allowed.",
            stack: err?.stack,
          });
        }
        return res
          .status(400)
          .json({ success: false, message: err.message, stack: err?.stack });
      }
      next();
    });
  },
  jobApplicantsControllers.applyJob
);

jobApplicantsRoutes.get(
  "/pay/:jobId",
  userAccess("job_seeker"),
  jobApplicantsControllers.payForJob
);

jobApplicantsRoutes.patch(
  "/:applicationId",
  userAccess("admin", "user"),
  jobApplicantsControllers.updateAppliedJob
);

jobApplicantsRoutes.get(
  "/me",
  userAccess("job_seeker"),
  jobApplicantsControllers.getMyAppliedJob
);

jobApplicantsRoutes.get(
  "/my-created-job",
  userAccess("user"),
  jobApplicantsControllers.getMyCreateJob
);

jobApplicantsRoutes.get(
  "/",
  userAccess("admin"),
  jobApplicantsControllers.getAllAppliedJob
);

export default jobApplicantsRoutes;
