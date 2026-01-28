import { Request, Response, NextFunction } from "express";
import { categoryService } from "./category.service";

const createCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await categoryService.createCategory(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const getAllCategories = async (req: Request, res: Response) => {
  const result = await categoryService.getAllCategories();
  res.json(result);
};

export const categoryController = {
  createCategory,
  getAllCategories,
};
