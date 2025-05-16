import { Router } from "express";
import userRoutes from "../modules/user/user.route";
import authRoutes from "../modules/auth/auth.route";
import jobsRoutes from "../modules/jobs/jobs.route";
import jobApplicantsRoutes from "../modules/jobApplication/jobApplication.route";

const router = Router();

const routes = [
  {
    path: "/users",
    route: userRoutes,
  },
  {
    path: "/auth",
    route: authRoutes,
  },
  {
    path: "/jobs",
    route: jobsRoutes,
  },
  {
    path: "/apply",
    route: jobApplicantsRoutes,
  },
];

routes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
