/*
  Warnings:

  - You are about to drop the column `apointmentsId` on the `Bike` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Bike" DROP CONSTRAINT "Bike_apointmentsId_fkey";

-- AlterTable
ALTER TABLE "Apointments" ADD COLUMN     "bikeId" TEXT;

-- AlterTable
ALTER TABLE "Bike" DROP COLUMN "apointmentsId";

-- AddForeignKey
ALTER TABLE "Apointments" ADD CONSTRAINT "Apointments_bikeId_fkey" FOREIGN KEY ("bikeId") REFERENCES "Bike"("id") ON DELETE SET NULL ON UPDATE CASCADE;
