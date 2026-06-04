import { Router } from "express";
import { categoryController } from "./category.controller";
import auth, { UserRole } from "../../middlewares/auth";
import { multerUpload } from "../../config/multer.config";

const router = Router();

router.post(
	"/",
	auth(UserRole.ADMIN, UserRole.PROVIDER),
	multerUpload.single("image"),
	categoryController.createCategory,
);
router.get("/", categoryController.getAllCategories);
router.delete("/:id", auth(UserRole.ADMIN, UserRole.PROVIDER), categoryController.deleteCategory);

export const categoryRouter = router;
