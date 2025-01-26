/*
  Warnings:

  - Added the required column `totalDebt` to the `Debt` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Debt" ADD COLUMN     "totalDebt" DECIMAL(65,30) NOT NULL;
