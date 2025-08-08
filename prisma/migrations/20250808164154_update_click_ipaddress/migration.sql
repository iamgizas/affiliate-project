/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Click` table. All the data in the column will be lost.
  - Added the required column `ecommerceId` to the `Click` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Click` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Click" DROP COLUMN "createdAt",
ADD COLUMN     "clickedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "ecommerceId" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."Click" ADD CONSTRAINT "Click_ecommerceId_fkey" FOREIGN KEY ("ecommerceId") REFERENCES "public"."Ecommerce"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Click" ADD CONSTRAINT "Click_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
