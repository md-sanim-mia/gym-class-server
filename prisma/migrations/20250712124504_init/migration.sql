/*
  Warnings:

  - You are about to drop the column `email` on the `trainee` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `trainee` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `trainee` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "trainee" DROP CONSTRAINT "trainee_email_fkey";

-- DropIndex
DROP INDEX "trainee_email_key";

-- AlterTable
ALTER TABLE "trainee" DROP COLUMN "email",
ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "trainee_userId_key" ON "trainee"("userId");

-- AddForeignKey
ALTER TABLE "trainee" ADD CONSTRAINT "trainee_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
