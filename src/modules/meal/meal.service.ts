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

const getMealById = async (id: string) => {
  return prisma.meal.findUnique({
    where: { id },
    include: {
      provider: true,
      category: true,
    //   reviews: true,
    },
  });
};


export const mealService = {
  createMeal,
 getAllMeals,
 getMealById

};
