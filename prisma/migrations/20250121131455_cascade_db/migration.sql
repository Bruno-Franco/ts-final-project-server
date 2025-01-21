-- DropForeignKey
ALTER TABLE "Apointments" DROP CONSTRAINT "Apointments_bikeId_fkey";

-- DropForeignKey
ALTER TABLE "Apointments" DROP CONSTRAINT "Apointments_userId_fkey";

-- AddForeignKey
ALTER TABLE "Apointments" ADD CONSTRAINT "Apointments_bikeId_fkey" FOREIGN KEY ("bikeId") REFERENCES "Bike"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Apointments" ADD CONSTRAINT "Apointments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
