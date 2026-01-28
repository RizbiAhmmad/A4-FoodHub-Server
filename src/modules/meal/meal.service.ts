import { prisma } from "../../lib/prisma";

const createMeal = async (providerId: string, data: any) => {
  return prisma.meal.create({
    data: {
      ...data,
      providerId,
    },
  });
};


export const mealService = {
  createMeal,
 
};
