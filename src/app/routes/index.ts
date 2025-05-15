import { Router } from "express";
import userRoutes from "../modules/user/user.route";
import authRoutes from "../modules/auth/auth.route";

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
];

routes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
