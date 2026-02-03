import { Router } from "express";
import { orderController } from "./order.controller";
import auth, { UserRole } from "../../middlewares/auth";

const router = Router();
router.get(
  "/provider",
  auth(UserRole.PROVIDER),
  orderController.getProviderOrders,
);

// Customer
router.post("/", auth(UserRole.CUSTOMER), orderController.createOrder);
router.get("/", auth(UserRole.CUSTOMER, UserRole.PROVIDER), orderController.getMyOrders);
router.get("/:id", auth(UserRole.CUSTOMER), orderController.getOrderDetails);


// Provider updates status
router.patch(
  "/:id/status",
  auth(UserRole.PROVIDER),
  orderController.updateOrderStatus,
);

export const orderRouter = router;
