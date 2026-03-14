/*
  Warnings:

  - A unique constraint covering the columns `[code]` on the table `products` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "products" ADD COLUMN     "code" TEXT,
ADD COLUMN     "quantity" INTEGER NOT NULL DEFAULT 0;

-- CreateIndex
CREATE UNIQUE INDEX "products_code_key" ON "products"("code");
