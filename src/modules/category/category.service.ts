import { prisma } from "../../lib/prisma";

const createCategory = async (data: { name: string; image?: string }) => {
  return prisma.category.create({ data });
};

import { QueryBuilder } from "../../builder/QueryBuilder";

const getAllCategories = async (query: Record<string, unknown>) => {
  const categoryQuery = new QueryBuilder(prisma.category as any, query, {
    searchableFields: ["name"],
    filterableFields: ["name"],
  })
    .search()
    .filter()
    .sort()
    .paginate()
    .fields()
    .dynamicInclude({ meals: true }, ["meals"]);

  return await categoryQuery.execute();
};

const deleteCategory = async (id: string) => {
  return prisma.category.delete({ where: { id } });
};

export const categoryService = {
  createCategory,
  getAllCategories,
  deleteCategory
};
