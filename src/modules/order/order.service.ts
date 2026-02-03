import { OrderStatus } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";

const createOrder = async (customerId: string, payload: any) => {
  const { items, address, phone } = payload;

  if (!items || items.length === 0) {
    throw new Error("No meals selected");
  }

  const mealIds = items.map((i: any) => i.mealId);
  const meals = await prisma.meal.findMany({
    where: { id: { in: mealIds } },
    include: { provider: true },
  });

  if (meals.length !== items.length) {
    throw new Error("Invalid meal in order");
  }

  if (meals.length === 0) {
    throw new Error("Meals not found");
  }

  const providerId = meals[0]!.providerId;
  const sameProvider = meals.every((m) => m.providerId === providerId);

  if (!sameProvider) {
    throw new Error("Order must be from one provider only");
  }

  let totalAmount = 0;
  const orderItemsData = items.map((item: any) => {
    const meal = meals.find((m) => m.id === item.mealId)!;
    const price = meal.price * item.quantity;
    totalAmount += price;

    return {
      mealId: meal.id,
      quantity: item.quantity,
      price: meal.price,
    };
  });

  const order = await prisma.order.create({
    data: {
      customerId,
      providerId,
      totalAmount,
      address,
      phone,
      status: OrderStatus.PLACED,
      items: {
        create: orderItemsData,
      },
    },
    include: {
      items: true,
    },
  });

  return order;
};

const getMyOrders = async (customerId: string) => {
  return prisma.order.findMany({
    where: { customerId },
    include: {
      items: { include: { meal: true } },
      provider: true,
    },
  });
};

const getOrderDetails = async (orderId: string) => {
  return prisma.order.findUnique({
    where: { id: orderId },
    include: {
      items: { include: { meal: true } },
      provider: true,
      customer: true,
    },
  });
};
const getProviderOrders = async (providerUserId: string) => {
  // find provider profile first
  const providerProfile = await prisma.providerProfile.findUnique({
    where: { userId: providerUserId },
  });

  if (!providerProfile) {
    throw new Error("Provider profile not found");
  }

  return prisma.order.findMany({
    where: { providerId: providerProfile.id },
    include: {
      items: { include: { meal: true } },
      customer: { select: { name: true, phone: true } },
    },
    orderBy: { createdAt: "desc" },
  });
};

const updateOrderStatus = async (orderId: string, status: OrderStatus) => {
  return prisma.order.update({
    where: { id: orderId },
    data: { status },
  });
};

export const orderService = {
  createOrder,
  getMyOrders,
  getOrderDetails,
  getProviderOrders,
  updateOrderStatus,
};
