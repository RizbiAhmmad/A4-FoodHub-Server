import { Request, Response, NextFunction } from "express";
import { providerService } from "./provider.service";

const createProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user;
    if (!user) throw new Error("Unauthorized");

    const result = await providerService.createProviderProfile(user.id, req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};



export const providerController = {
  createProfile,

};
