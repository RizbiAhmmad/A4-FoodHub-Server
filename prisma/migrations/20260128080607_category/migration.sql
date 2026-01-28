/*
  Warnings:

  - You are about to drop the column `category` on the `Meal` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Meal" DROP COLUMN "category",
ADD COLUMN     "categoryId" TEXT,
ALTER COLUMN "updatedAt" DROP DEFAULT;

-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");

-- AddForeignKey
ALTER TABLE "Meal" ADD CONSTRAINT "Meal_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;
