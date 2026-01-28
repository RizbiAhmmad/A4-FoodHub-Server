import { Request, Response, NextFunction } from "express";
import { mealService } from "./meal.service";
import { prisma } from "../../lib/prisma";

const createMeal = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user!;
    const provider = await prisma.providerProfile.findUnique({
      where: { userId: user.id },
    });

    if (!provider) throw new Error("Provider profile not found");

    const result = await mealService.createMeal(provider.id, req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const getAllMeals = async (req: Request, res: Response) => {
  const result = await mealService.getAllMeals();
  res.json(result);
};

const getMealById = async (req: Request, res: Response) => {
  const result = await mealService.getMealById(req.params.id as string);
  res.json(result);
};

const updateMeal = async (req: Request, res: Response) => {
  const user = req.user!;
  const provider = await prisma.providerProfile.findUnique({
    where: { userId: user.id },
  });

  const result = await mealService.updateMeal(
    req.params.id as string,
    provider!.id,
    req.body,
  );

  res.json(result);
};

const deleteMeal = async (req: Request, res: Response) => {
  const user = req.user!;
  const provider = await prisma.providerProfile.findUnique({
    where: { userId: user.id },
  });

  const result = await mealService.deleteMeal(
    req.params.id as string,
    provider!.id,
  );

  res.json(result);
};

export const mealController = {
  createMeal,
  getAllMeals,
  getMealById,
  updateMeal,
  deleteMeal,
};
