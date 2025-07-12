-- CreateTable
CREATE TABLE "booking" (
    "id" TEXT NOT NULL,
    "bookingDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isCanceled" BOOLEAN NOT NULL DEFAULT false,
    "traineeId" TEXT NOT NULL,
    "scheduleId" TEXT NOT NULL,

    CONSTRAINT "booking_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "booking_traineeId_idx" ON "booking"("traineeId");

-- CreateIndex
CREATE INDEX "booking_scheduleId_idx" ON "booking"("scheduleId");

-- CreateIndex
CREATE UNIQUE INDEX "booking_traineeId_scheduleId_key" ON "booking"("traineeId", "scheduleId");

-- AddForeignKey
ALTER TABLE "booking" ADD CONSTRAINT "booking_traineeId_fkey" FOREIGN KEY ("traineeId") REFERENCES "trainee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "booking" ADD CONSTRAINT "booking_scheduleId_fkey" FOREIGN KEY ("scheduleId") REFERENCES "schedule"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
