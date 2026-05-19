import { Router } from "express";
import { metaController } from "./meta.controller";

const router = Router();

router.get("/admin-analytics", metaController.getAdminAnalytics);

export const metaRouter = router;
