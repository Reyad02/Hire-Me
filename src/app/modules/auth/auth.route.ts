import { Router } from "express";
import { authControllers } from "./auth.controller";

const authRoutes = Router();

authRoutes.post("/login", authControllers.loginUser);

export default authRoutes;