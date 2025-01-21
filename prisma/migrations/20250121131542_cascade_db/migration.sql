-- DropForeignKey
ALTER TABLE "Bike" DROP CONSTRAINT "Bike_userId_fkey";

-- AddForeignKey
ALTER TABLE "Bike" ADD CONSTRAINT "Bike_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
