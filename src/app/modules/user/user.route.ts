import { Router } from "express";
import { userControllers } from "./user.controller";
import userAccess from "../../middlewares/userAccess";

const userRoutes = Router();

userRoutes.post("/register", userControllers.registerUser);

userRoutes.put("/:userEmail", userAccess("admin"), userControllers.updateUser);

userRoutes.delete(
  "/:userEmail",
  userAccess("admin"),
  userControllers.deleteUser
);

userRoutes.get("/:userEmail", userAccess("admin"), userControllers.getUser);

userRoutes.get("/", userAccess("admin"), userControllers.getAllUsers);

export default userRoutes;
