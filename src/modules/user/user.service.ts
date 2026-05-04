import { prisma } from "../../lib/prisma";
import { QueryBuilder } from "../../builder/QueryBuilder";

const getAllUsers = async (query: Record<string, unknown>) => {
  const userQuery = new QueryBuilder(prisma.user as any, query, {
    searchableFields: ["name", "email", "role", "status"],
    filterableFields: ["role", "status"],
  })
    .search()
    .filter()
    .sort()
    .paginate()
    .fields()
    .dynamicInclude({
      providerProfile: {
        select: {
          restaurantName: true,
          isApproved: true,
        },
      },
    }, ["providerProfile"]);

  // We need to set a default select to hide password if no fields are requested
  if (!userQuery.getQuery().select) {
    userQuery.getQuery().select = {
      id: true,
      name: true,
      email: true,
      role: true,
      status: true,
      createdAt: true,
      providerProfile: {
        select: {
          restaurantName: true,
          isApproved: true,
        },
      },
    };
    delete userQuery.getQuery().include;
  }

  return await userQuery.execute();
};

const getMe = async (userId: string) => {
  return prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      status: true,
      createdAt: true,
      providerProfile: {
        select: {
          restaurantName: true,
          isApproved: true,
        },
      },
    },
  });
};

const changeUserRole = async (userId: string, role: string) => {
  return prisma.user.update({
    where: { id: userId },
    data: { role },
  });
};

const changeUserStatus = async (userId: string, status: string) => {
  return prisma.user.update({
    where: { id: userId },
    data: { status },
  });
};

export const userService = {
  getAllUsers,
  changeUserRole,
  changeUserStatus,
  getMe
};
