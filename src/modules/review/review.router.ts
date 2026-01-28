import { Router } from "express";
import { reviewController } from "./review.controller";
import auth, { UserRole } from "../../middlewares/auth";

const router = Router();

// Create review (only logged-in customers)
router.post("/", auth(UserRole.CUSTOMER), reviewController.createReview);

// Get all reviews for a meal
router.get("/meal/:mealId", reviewController.getMealReviews);

// Get all reviews by logged-in customer
router.get("/me", auth(UserRole.CUSTOMER), reviewController.getCustomerReviews);

// Update review
router.put("/:mealId", auth(UserRole.CUSTOMER), reviewController.updateReview);

// Delete review
router.delete("/:mealId", auth(UserRole.CUSTOMER), reviewController.deleteReview);

export const reviewRouter = router;
