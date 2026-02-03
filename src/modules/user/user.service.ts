import { prisma } from "../../lib/prisma";

const getAllUsers = async () => {
  return prisma.user.findMany({
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
    orderBy: { createdAt: "desc" },
  });
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
