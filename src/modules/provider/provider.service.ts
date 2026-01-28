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


export const providerService = {
  createProviderProfile,
  
};
