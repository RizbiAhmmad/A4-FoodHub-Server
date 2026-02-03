import { Request, Response } from "express";
import { userService } from "./user.service";

const getMe = async (req: Request, res: Response) => {
  if (!req.user?.id) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const user = await userService.getMe(req.user.id);
  res.json(user);
};

const getAllUsers = async (req: Request, res: Response) => {
  const users = await userService.getAllUsers();
  res.json(users);
};

const updateRole = async (req: Request, res: Response) => {
  const userId = req.params.id;

  if (!userId || Array.isArray(userId)) {
    return res.status(400).json({ message: "Invalid user id" });
  }

  const result = await userService.changeUserRole(userId, req.body.role);
  res.json(result);
};

const updateStatus = async (req: Request, res: Response) => {
  const userId = req.params.id;

  if (!userId || Array.isArray(userId)) {
    return res.status(400).json({ message: "Invalid user id" });
  }

  const result = await userService.changeUserStatus(userId, req.body.status);
  res.json(result);
};

export const userController = {
  getAllUsers,
  updateRole,
  updateStatus,
  getMe,
};
