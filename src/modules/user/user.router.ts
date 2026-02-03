import { Router } from "express";
import auth, { UserRole } from "../../middlewares/auth";
import { userController } from "./user.controller";

const router = Router();
router.get("/me", auth(), userController.getMe);
// ADMIN ONLY
router.get("/", auth(UserRole.ADMIN), userController.getAllUsers);
router.patch("/:id/role", auth(UserRole.ADMIN), userController.updateRole);
router.patch("/:id/status", auth(UserRole.ADMIN), userController.updateStatus);

export const userRouter = router;
