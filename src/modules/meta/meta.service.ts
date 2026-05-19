import { prisma } from "../../lib/prisma";

const getAdminStats = async () => {
  const [totalRevenue, totalOrders, totalCustomers, totalProviders, totalMeals] = await Promise.all([
    prisma.order.aggregate({
      where: { status: "DELIVERED" },
      _sum: { totalAmount: true },
    }),
    prisma.order.count(),
    prisma.user.count({ where: { role: "CUSTOMER" } }),
    prisma.providerProfile.count(),
    prisma.meal.count(),
  ]);

  return {
    totalRevenue: totalRevenue._sum.totalAmount || 0,
    totalOrders,
    totalCustomers,
    totalProviders,
    totalMeals,
  };
};

const getSalesData = async () => {
  // Get sales for the last 7 days
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const sales = await prisma.order.findMany({
    where: {
      createdAt: { gte: sevenDaysAgo },
      status: "DELIVERED",
    },
    select: {
      totalAmount: true,
      createdAt: true,
    },
    orderBy: { createdAt: "asc" },
  });

  // Group by date
  const groupedSales = sales.reduce((acc: Record<string, number>, curr) => {
    const date = curr.createdAt.toISOString().split("T")[0] as string;
    if (!acc[date]) acc[date] = 0;
    acc[date] += curr.totalAmount;
    return acc;
  }, {} as Record<string, number>);

  return Object.keys(groupedSales).map((date) => ({
    date,
    revenue: (groupedSales as Record<string, number>)[date],
  }));
};

const getCategoryStats = async () => {
  const categories = await prisma.category.findMany({
    include: {
      _count: {
        select: { meals: true },
      },
    },
  });

  return categories.map((c) => ({
    name: c.name,
    count: c._count.meals,
  }));
};

export const metaService = {
  getAdminStats,
  getSalesData,
  getCategoryStats,
};
