/*
  Warnings:

  - You are about to drop the column `type` on the `Cry` table. All the data in the column will be lost.
  - You are about to drop the column `url` on the `Cry` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Sprite` table. All the data in the column will be lost.
  - You are about to drop the column `url` on the `Sprite` table. All the data in the column will be lost.
  - Added the required column `latest` to the `Cry` table without a default value. This is not possible if the table is not empty.
  - Added the required column `legacy` to the `Cry` table without a default value. This is not possible if the table is not empty.
  - Added the required column `latest` to the `Sprite` table without a default value. This is not possible if the table is not empty.
  - Added the required column `legacy` to the `Sprite` table without a default value. This is not possible if the table is not empty.
  - Added the required column `main` to the `Sprite` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Cry" DROP COLUMN "type",
DROP COLUMN "url",
ADD COLUMN     "latest" TEXT NOT NULL,
ADD COLUMN     "legacy" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Sprite" DROP COLUMN "type",
DROP COLUMN "url",
ADD COLUMN     "latest" TEXT NOT NULL,
ADD COLUMN     "legacy" TEXT NOT NULL,
ADD COLUMN     "main" TEXT NOT NULL;
