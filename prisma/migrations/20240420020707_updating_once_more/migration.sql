/*
  Warnings:

  - You are about to drop the column `is_hidden` on the `Ability` table. All the data in the column will be lost.
  - You are about to drop the column `slot` on the `Ability` table. All the data in the column will be lost.
  - You are about to drop the column `base_experience` on the `Pokemon` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Ability" DROP COLUMN "is_hidden",
DROP COLUMN "slot";

-- AlterTable
ALTER TABLE "Move" ALTER COLUMN "pp" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Pokemon" DROP COLUMN "base_experience",
ADD COLUMN     "baseExperience" TEXT;
