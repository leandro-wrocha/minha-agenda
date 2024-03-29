/*
  Warnings:

  - The values [register] on the enum `TypeLog` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `action` on the `logs` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `logs` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `schedules` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `services` table. All the data in the column will be lost.
  - You are about to drop the column `serviceId` on the `times_scheduled` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `times_scheduled` table. All the data in the column will be lost.
  - Added the required column `method` to the `logs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "TypeLog_new" AS ENUM ('create', 'edit', 'delete');
ALTER TABLE "logs" ALTER COLUMN "type" TYPE "TypeLog_new" USING ("type"::text::"TypeLog_new");
ALTER TYPE "TypeLog" RENAME TO "TypeLog_old";
ALTER TYPE "TypeLog_new" RENAME TO "TypeLog";
DROP TYPE "TypeLog_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "logs" DROP CONSTRAINT "logs_userId_fkey";

-- DropForeignKey
ALTER TABLE "schedules" DROP CONSTRAINT "schedules_userId_fkey";

-- DropForeignKey
ALTER TABLE "services" DROP CONSTRAINT "services_userId_fkey";

-- DropForeignKey
ALTER TABLE "times_scheduled" DROP CONSTRAINT "times_scheduled_serviceId_fkey";

-- DropForeignKey
ALTER TABLE "times_scheduled" DROP CONSTRAINT "times_scheduled_userId_fkey";

-- AlterTable
ALTER TABLE "logs" DROP COLUMN "action",
DROP COLUMN "userId",
ADD COLUMN     "method" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "schedules" DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "services" DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "times_scheduled" DROP COLUMN "serviceId",
DROP COLUMN "userId";

-- AddForeignKey
ALTER TABLE "schedules" ADD CONSTRAINT "schedules_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "services" ADD CONSTRAINT "services_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "times_scheduled" ADD CONSTRAINT "times_scheduled_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "times_scheduled" ADD CONSTRAINT "times_scheduled_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "services"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "logs" ADD CONSTRAINT "logs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
