/*
  Warnings:

  - You are about to drop the column `userId` on the `trainee` table. All the data in the column will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[email]` on the table `trainee` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `trainee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `trainee` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "trainee" DROP CONSTRAINT "trainee_userId_fkey";

-- DropIndex
DROP INDEX "trainee_userId_key";

-- AlterTable
ALTER TABLE "trainee" DROP COLUMN "userId",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "users";

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "trainee_email_key" ON "trainee"("email");

-- AddForeignKey
ALTER TABLE "trainee" ADD CONSTRAINT "trainee_email_fkey" FOREIGN KEY ("email") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
