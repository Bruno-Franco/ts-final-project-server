-- AlterTable
ALTER TABLE "User" ADD COLUMN     "bikeId" TEXT,
ADD COLUMN     "isEmployee" BOOLEAN DEFAULT false;

-- CreateTable
CREATE TABLE "Bike" (
    "id" TEXT NOT NULL,
    "plate" TEXT NOT NULL,
    "model" TEXT,
    "family" TEXT,
    "vin" TEXT,
    "userId" TEXT NOT NULL,
    "apointmentsId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Bike_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Apointments" (
    "id" TEXT NOT NULL,
    "preferredDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Apointments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Bike_plate_key" ON "Bike"("plate");

-- CreateIndex
CREATE UNIQUE INDEX "Bike_vin_key" ON "Bike"("vin");

-- AddForeignKey
ALTER TABLE "Bike" ADD CONSTRAINT "Bike_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bike" ADD CONSTRAINT "Bike_apointmentsId_fkey" FOREIGN KEY ("apointmentsId") REFERENCES "Apointments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
