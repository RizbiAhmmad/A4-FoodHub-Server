import { Router } from "express";
import { providerController } from "./provider.controller";
import auth, { UserRole } from "../../middlewares/auth";

const router = Router();

router.post("/", auth(UserRole.PROVIDER), providerController.createProfile);
router.get("/me", auth(UserRole.PROVIDER), providerController.getMyProfile);
router.patch("/me", auth(UserRole.PROVIDER), providerController.updateProfile);

export const providerRouter = router;
