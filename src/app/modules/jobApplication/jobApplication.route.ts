import { NextFunction, Request, Response, Router } from "express";
import { upload } from "../../utils/sendPdf";
import { jobApplicantsControllers } from "./jobApplication.controllers";
import userAccess from "../../middlewares/userAccess";

const jobApplicantsRoutes = Router();

// jobApplicantsRoutes.post(
//   "/apply",
//   userAccess("job_seeker"),
//   upload.single("file"),
//   (req: Request, res: Response, next: NextFunction) => {

//     try {
//       req.body = JSON.parse(req.body?.data);
//       next();
//     } catch (err: any) {
//       console.log("from here");
//       console.log(err);
//       res.json({
//         success: false,
//         message: err?.message,
//         stack: err?.stack,
//       });
//     }
//   },
//   jobApplicantsControllers.applyJob
// );

jobApplicantsRoutes.post(
  "/apply",
  userAccess("job_seeker"),
  (req: Request, res: Response, next: NextFunction) => {
    upload.single("file")(req, res, function (err: any) {
      if (err) {
        if (err.code === "LIMIT_FILE_SIZE") {
          return res
            .status(400)
            .json({
              success: false,
              message: "File too large. Max 5MB allowed.",
            });
        }
        return res.status(400).json({ success: false, message: err.message });
      }

      try {
        req.body = JSON.parse(req.body?.data);
        next();
      } catch (parseErr: any) {
        return res.status(400).json({
          success: false,
          message: "Invalid JSON in form data",
          error: parseErr.message,
        });
      }
    });
  },
  jobApplicantsControllers.applyJob
);
jobApplicantsRoutes.post(
  "/apply",
  userAccess("job_seeker"),
  (req: Request, res: Response, next: NextFunction) => {
    upload.single("file")(req, res, function (err: any) {
      if (err) {
        if (err.code === "LIMIT_FILE_SIZE") {
          return res
            .status(400)
            .json({
              success: false,
              message: "File too large. Max 5MB allowed.",
            });
        }
        return res.status(400).json({ success: false, message: err.message });
      }

      try {
        req.body = JSON.parse(req.body?.data);
        next();
      } catch (parseErr: any) {
        return res.status(400).json({
          success: false,
          message: "Invalid JSON in form data",
          error: parseErr.message,
        });
      }
    });
  },
  jobApplicantsControllers.applyJob
);
jobApplicantsRoutes.post(
  "/apply",
  userAccess("job_seeker"),
  (req: Request, res: Response, next: NextFunction) => {
    upload.single("file")(req, res, function (err: any) {
      if (err) {
        if (err.code === "LIMIT_FILE_SIZE") {
          return res
            .status(400)
            .json({
              success: false,
              message: "File too large. Max 5MB allowed.",
            });
        }
        return res.status(400).json({ success: false, message: err.message });
      }

      try {
        req.body = JSON.parse(req.body?.data);
        next();
      } catch (parseErr: any) {
        return res.status(400).json({
          success: false,
          message: "Invalid JSON in form data",
          error: parseErr.message,
        });
      }
    });
  },
  jobApplicantsControllers.applyJob
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
