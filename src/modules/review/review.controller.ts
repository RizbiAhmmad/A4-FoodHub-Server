import { Request, Response, NextFunction } from "express";
import { reviewService } from "./review.server";


const createReview = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user) throw new Error("Unauthorized"); // user নইলে error
    const customerId = req.user.id;

    const review = await reviewService.createReview(customerId, req.body);
    res.status(201).json(review);
  } catch (error) {
    next(error);
  }
};

const getMealReviews = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const mealId = req.params.mealId as string;
    if (!mealId) throw new Error("Meal ID is required");

    
    const reviews = await reviewService.getMealReviews(mealId);
    res.json(reviews);
  } catch (error) {
    next(error);
  }
};

const getCustomerReviews = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user) throw new Error("Unauthorized");
    const reviews = await reviewService.getCustomerReviews(req.user.id);
    res.json(reviews);
  } catch (error) {
    next(error);
  }
};

const updateReview = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user) throw new Error("Unauthorized");
    const mealId = req.params.mealId as string;
    if (!mealId) throw new Error("Meal ID is required");

    const review = await reviewService.updateReview(req.user.id, mealId, req.body);
    res.json(review);
  } catch (error) {
    next(error);
  }
};

const deleteReview = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user) throw new Error("Unauthorized");
    const mealId = req.params.mealId as string;
    if (!mealId) throw new Error("Meal ID is required");

    await reviewService.deleteReview(req.user.id, mealId);
    res.json({ message: "Review deleted" });
  } catch (error) {
    next(error);
  }
};

export const reviewController = {
  createReview,
  getMealReviews,
  getCustomerReviews,
  updateReview,
  deleteReview,
};
