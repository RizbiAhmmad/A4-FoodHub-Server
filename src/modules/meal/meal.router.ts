import { Router } from "express";
import { mealController } from "./meal.controller";
import auth, { UserRole } from "../../middlewares/auth";

const router = Router();


// PROVIDER ONLY
router.post("/", auth(UserRole.PROVIDER), mealController.createMeal);


export const mealRouter = router;
