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

    const payload: any = { ...req.body };
    if (req.file) {
      // @ts-ignore
      payload.image = req.file.path || req.file.secure_url || req.file.url;
    }

    const result = await mealService.createMeal(provider.id, payload);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const getAllMeals = async (req: Request, res: Response) => {
  const query = { ...req.query } as any;

  // Map legacy frontend filters to QueryBuilder format
  if (query.minPrice || query.maxPrice) {
    query.price = {};
    if (query.minPrice) query.price.gte = Number(query.minPrice);
    if (query.maxPrice) query.price.lte = Number(query.maxPrice);
    delete query.minPrice;
    delete query.maxPrice;
  }

  if (query.cuisine) {
    query["category.name"] = query.cuisine;
    delete query.cuisine;
  }

  const result = await mealService.getAllMeals(query);
  res.json(result);
};

const getMyMeals = async (req: Request, res: Response) => {
  try {
    const user = req.user!; // logged-in user
    const provider = await prisma.providerProfile.findUnique({
      where: { userId: user.id },
    });

    if (!provider) throw new Error("Provider profile not found");

    const meals = await mealService.getMealsByProvider(provider.id);
    res.json(meals);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
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

  const payload: any = { ...req.body };
  if (req.file) {
    // @ts-ignore
    payload.image = req.file.path || req.file.secure_url || req.file.url;
  }

  const result = await mealService.updateMeal(
    req.params.id as string,
    provider!.id,
    payload,
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
  getMyMeals,
  getMealById,
  updateMeal,
  deleteMeal,
};
