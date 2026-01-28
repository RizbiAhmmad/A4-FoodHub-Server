import { Request, Response, NextFunction } from "express";
import { orderService } from "./order.service";
import { OrderStatus } from "../../../generated/prisma/enums";


const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user;
    if (!user) throw new Error("Unauthorized");

    const result = await orderService.createOrder(user.id, req.body);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

const getMyOrders = async (req: Request, res: Response) => {
  const user = req.user!;
  const result = await orderService.getMyOrders(user.id);
  res.json(result);
};

const getOrderDetails = async (req: Request, res: Response) => {
  const result = await orderService.getOrderDetails(req.params.id as string);
  res.json(result);
};

const updateOrderStatus = async (req: Request, res: Response) => {
  const { status } = req.body;
  const result = await orderService.updateOrderStatus(
    req.params.id as string,
    status as OrderStatus
  );
  res.json(result);
};

export const orderController = {
  createOrder,
  getMyOrders,
  getOrderDetails,
  updateOrderStatus,
};
