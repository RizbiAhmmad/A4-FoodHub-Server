import { prisma } from "../../lib/prisma";
import { QueryBuilder } from "../../builder/QueryBuilder";
import { Prisma } from "../../../generated/prisma/client";

const createMeal = async (providerId: string, data: any) => {
  return prisma.meal.create({
    data: {
      ...data,
      providerId,
    },
  });
};

const getAllMeals = async (query: Record<string, unknown>) => {
  const mealQuery = new QueryBuilder(
    prisma.meal as any,
    query,
    {
      searchableFields: ["name", "description", "category.name", "provider.restaurantName"],
      filterableFields: ["price", "categoryId", "providerId", "category.name"],
    }
  )
    .search()
    .filter()
    .sort()
    .paginate()
    .fields()
    .dynamicInclude(
      {
        provider: true,
        category: true,
      },
      ["provider", "category"]
    );

  return await mealQuery.execute();
};

const getMealsByProvider = async (providerId: string) => {
  return prisma.meal.findMany({
    where: { providerId },
    include: {
      category: true,
      provider: true,
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

const updateMeal = async (mealId: string, providerId: string, data: any) => {
  return prisma.meal.updateMany({
    where: { id: mealId, providerId },
    data,
  });
};

const deleteMeal = async (mealId: string, providerId: string) => {
  return prisma.meal.deleteMany({
    where: { id: mealId, providerId },
  });
};

export const mealService = {
  createMeal,
  getAllMeals,
  getMealsByProvider,
  getMealById,
  updateMeal,
  deleteMeal,
};
