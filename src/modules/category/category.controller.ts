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

export const categoryController = {
  createCategory,
  
};
