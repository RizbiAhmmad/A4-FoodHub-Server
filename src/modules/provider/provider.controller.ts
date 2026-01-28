import { Request, Response, NextFunction } from "express";
import { providerService } from "./provider.service";

const createProfile = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = req.user;
    if (!user) throw new Error("Unauthorized");

    const result = await providerService.createProviderProfile(
      user.id,
      req.body,
    );
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const getMyProfile = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    if (!user) throw new Error("Unauthorized");

    const result = await providerService.getProviderProfileByUserId(user.id);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error, details: error });
  }
};

const updateProfile = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    if (!user) throw new Error("Unauthorized");

    const result = await providerService.updateProviderProfile(user.id, req.body);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error, details: error });
  }
};

export const providerController = {
  createProfile,
  getMyProfile,
  updateProfile,
};
