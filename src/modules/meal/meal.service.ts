import { prisma } from "../../lib/prisma";

const createMeal = async (providerId: string, data: any) => {
  return prisma.meal.create({
    data: {
      ...data,
      providerId,
    },
  });
};

const getAllMeals = async () => {
  return prisma.meal.findMany({
    include: {
      provider: true,
      category: true,
    },
  });
};


export const mealService = {
  createMeal,
 getAllMeals,
 
};
