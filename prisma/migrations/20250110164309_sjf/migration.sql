-- AlterTable
ALTER TABLE "Apointments" ADD COLUMN     "userId" TEXT;

-- AddForeignKey
ALTER TABLE "Apointments" ADD CONSTRAINT "Apointments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
