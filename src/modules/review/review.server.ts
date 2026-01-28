import { prisma } from "../../lib/prisma";

interface CreateReviewInput {
  mealId: string;
  rating: number;
  comment?: string;
}

const createReview = async (customerId: string, data: CreateReviewInput) => {
  const { mealId, rating, comment } = data;

  // Check if review already exists
  const existing = await prisma.review.findUnique({
    where: { mealId_customerId: { mealId, customerId } },
  });
  if (existing) throw new Error("You have already reviewed this meal");

  return prisma.review.create({
    data: {
      mealId,
      customerId,
      rating,
      comment: comment ?? null,
    },
  });
};

const getMealReviews = async (mealId: string) => {
  return prisma.review.findMany({
    where: { mealId },
    include: { customer: true },
  });
};

const getCustomerReviews = async (customerId: string) => {
  return prisma.review.findMany({
    where: { customerId },
    include: { meal: true },
  });
};

const updateReview = async (
  customerId: string,
  mealId: string,
  data: { rating?: number; comment?: string }
) => {
  return prisma.review.update({
    where: { mealId_customerId: { mealId, customerId } },
    data,
  });
};

const deleteReview = async (customerId: string, mealId: string) => {
  return prisma.review.delete({
    where: { mealId_customerId: { mealId, customerId } },
  });
};

export const reviewService = {
  createReview,
  getMealReviews,
  getCustomerReviews,
  updateReview,
  deleteReview,
};
