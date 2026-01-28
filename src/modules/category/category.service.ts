import { prisma } from "../../lib/prisma";

const createCategory = async (data: { name: string; image?: string }) => {
  return prisma.category.create({ data });
};

const getAllCategories = async () => {
  return prisma.category.findMany({
    include: { meals: true }, 
  });
};

const deleteCategory = async (id: string) => {
  return prisma.category.delete({ where: { id } });
};

export const categoryService = {
  createCategory,
  getAllCategories,
  deleteCategory
};
