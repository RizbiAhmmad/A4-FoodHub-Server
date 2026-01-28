import { prisma } from "../../lib/prisma";

const createCategory = async (data: { name: string; image?: string }) => {
  return prisma.category.create({ data });
};



export const categoryService = {
  createCategory,
  
};
