import { Router } from "express";
import { mealController } from "./meal.controller";
import auth, { UserRole } from "../../middlewares/auth";

const router = Router();

router.get("/", mealController.getAllMeals);
router.get("/my-meals", auth(UserRole.PROVIDER), mealController.getMyMeals);
router.get("/:id", mealController.getMealById);


// PROVIDER ONLY
router.post("/", auth(UserRole.PROVIDER), mealController.createMeal);
router.patch("/:id", auth(UserRole.PROVIDER), mealController.updateMeal);
router.delete("/:id", auth(UserRole.PROVIDER), mealController.deleteMeal);

export const mealRouter = router;
