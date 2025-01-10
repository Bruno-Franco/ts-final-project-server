/*
  Warnings:

  - Made the column `plate` on table `Bike` required. This step will fail if there are existing NULL values in that column.
  - Made the column `family` on table `Bike` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userId` on table `Bike` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Bike" DROP CONSTRAINT "Bike_userId_fkey";

-- AlterTable
ALTER TABLE "Bike" ALTER COLUMN "plate" SET NOT NULL,
ALTER COLUMN "family" SET NOT NULL,
ALTER COLUMN "userId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Bike" ADD CONSTRAINT "Bike_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
