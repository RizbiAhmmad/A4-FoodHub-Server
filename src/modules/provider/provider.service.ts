import { ProviderProfile } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

const createProviderProfile = async (userId: string, data: Omit<ProviderProfile, "id" | "createdAt" | "updatedAt" | "userId">) => {
  return await prisma.providerProfile.create({
    data: {
      ...data,
      userId,
    },
  });
};

const getProviderProfileByUserId = async (userId: string) => {
  return await prisma.providerProfile.findUnique({
    where: { userId },
    include: { meals: true },
  });
};


export const providerService = {
  createProviderProfile,
  getProviderProfileByUserId
};
