-- DropForeignKey
ALTER TABLE "Bike" DROP CONSTRAINT "Bike_apointmentsId_fkey";

-- DropForeignKey
ALTER TABLE "Bike" DROP CONSTRAINT "Bike_userId_fkey";

-- AlterTable
ALTER TABLE "Bike" ALTER COLUMN "userId" DROP NOT NULL,
ALTER COLUMN "apointmentsId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Bike" ADD CONSTRAINT "Bike_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bike" ADD CONSTRAINT "Bike_apointmentsId_fkey" FOREIGN KEY ("apointmentsId") REFERENCES "Apointments"("id") ON DELETE SET NULL ON UPDATE CASCADE;
