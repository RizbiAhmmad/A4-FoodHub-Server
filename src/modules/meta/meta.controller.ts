import { Request, Response, NextFunction } from "express";
import { metaService } from "./meta.service";

const getAdminAnalytics = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const stats = await metaService.getAdminStats();
    const salesData = await metaService.getSalesData();
    const categoryData = await metaService.getCategoryStats();

    res.json({
      success: true,
      data: {
        stats,
        salesData,
        categoryData,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const metaController = {
  getAdminAnalytics,
};
