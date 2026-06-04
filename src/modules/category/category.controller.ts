import { Request, Response, NextFunction } from "express";
import { categoryService } from "./category.service";

const createCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const payload: any = { ...req.body };

    // If file was uploaded via multer + Cloudinary storage, extract the URL
    if (req.file) {
      // multer-storage-cloudinary typically sets `path` to the uploaded URL
      // fall back to `secure_url` or `url` if available
      // @ts-ignore
      payload.image = req.file.path || req.file.secure_url || req.file.url;
    }

    const result = await categoryService.createCategory(payload);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const getAllCategories = async (req: Request, res: Response) => {
  const result = await categoryService.getAllCategories(req.query as Record<string, unknown>);
  res.json(result);
};

const deleteCategory = async (req: Request, res: Response) => {
  const result = await categoryService.deleteCategory(req.params.id as string);
  res.json(result);
};

export const categoryController = {
  createCategory,
  getAllCategories,
  deleteCategory
};
