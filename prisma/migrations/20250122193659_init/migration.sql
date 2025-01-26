/*
  Warnings:

  - Changed the type of `amount_paid` on the `Payment` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Payment" DROP COLUMN "amount_paid",
ADD COLUMN     "amount_paid" DECIMAL(65,30) NOT NULL;
