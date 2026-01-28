import { Router } from "express";
import { mealController } from "./meal.controller";
import auth, { UserRole } from "../../middlewares/auth";

const router = Router();

router.get("/", mealController.getAllMeals);
router.get("/:id", mealController.getMealById);

// PROVIDER ONLY
router.post("/", auth(UserRole.PROVIDER), mealController.createMeal);


export const mealRouter = router;
