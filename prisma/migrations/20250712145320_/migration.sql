-- CreateTable
CREATE TABLE "schedule" (
    "id" TEXT NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "capacity" INTEGER NOT NULL DEFAULT 10,
    "bookedTrainees" INTEGER NOT NULL DEFAULT 0,
    "trainerId" TEXT NOT NULL,

    CONSTRAINT "schedule_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "schedule_trainerId_idx" ON "schedule"("trainerId");

-- AddForeignKey
ALTER TABLE "schedule" ADD CONSTRAINT "schedule_trainerId_fkey" FOREIGN KEY ("trainerId") REFERENCES "trainer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
