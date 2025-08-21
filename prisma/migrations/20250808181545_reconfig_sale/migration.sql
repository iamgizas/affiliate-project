/*
  Warnings:

  - You are about to drop the column `commissionValue` on the `Sale` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[orderId]` on the table `Sale` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `commission` to the `Sale` table without a default value. This is not possible if the table is not empty.
  - Added the required column `orderId` to the `Sale` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Sale` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Sale" DROP COLUMN "commissionValue",
ADD COLUMN     "commission" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "orderId" TEXT NOT NULL,
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'PENDING',
ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Sale_orderId_key" ON "public"."Sale"("orderId");

-- AddForeignKey
ALTER TABLE "public"."Sale" ADD CONSTRAINT "Sale_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
