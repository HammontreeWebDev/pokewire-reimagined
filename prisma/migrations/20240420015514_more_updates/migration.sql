/*
  Warnings:

  - You are about to drop the column `contest_normal_use_after` on the `Move` table. All the data in the column will be lost.
  - You are about to drop the column `contest_normal_use_before` on the `Move` table. All the data in the column will be lost.
  - You are about to drop the column `contest_super_use_after` on the `Move` table. All the data in the column will be lost.
  - You are about to drop the column `contest_super_use_before` on the `Move` table. All the data in the column will be lost.
  - You are about to drop the column `contest_type` on the `Move` table. All the data in the column will be lost.
  - You are about to drop the column `damage_class` on the `Move` table. All the data in the column will be lost.
  - You are about to drop the column `effect_chance` on the `Move` table. All the data in the column will be lost.
  - You are about to drop the column `effect_description` on the `Move` table. All the data in the column will be lost.
  - Added the required column `contestNormalUseAfter` to the `Move` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contestNormalUseBefore` to the `Move` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contestSuperUseAfter` to the `Move` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contestSuperUseBefore` to the `Move` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contestType` to the `Move` table without a default value. This is not possible if the table is not empty.
  - Added the required column `damageClass` to the `Move` table without a default value. This is not possible if the table is not empty.
  - Added the required column `effectDescription` to the `Move` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Move" DROP COLUMN "contest_normal_use_after",
DROP COLUMN "contest_normal_use_before",
DROP COLUMN "contest_super_use_after",
DROP COLUMN "contest_super_use_before",
DROP COLUMN "contest_type",
DROP COLUMN "damage_class",
DROP COLUMN "effect_chance",
DROP COLUMN "effect_description",
ADD COLUMN     "contestNormalUseAfter" TEXT NOT NULL,
ADD COLUMN     "contestNormalUseBefore" TEXT NOT NULL,
ADD COLUMN     "contestSuperUseAfter" TEXT NOT NULL,
ADD COLUMN     "contestSuperUseBefore" TEXT NOT NULL,
ADD COLUMN     "contestType" TEXT NOT NULL,
ADD COLUMN     "damageClass" TEXT NOT NULL,
ADD COLUMN     "effectChance" TEXT,
ADD COLUMN     "effectDescription" TEXT NOT NULL,
ALTER COLUMN "accuracy" SET DATA TYPE TEXT,
ALTER COLUMN "power" SET DATA TYPE TEXT,
ALTER COLUMN "pp" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Pokemon" ALTER COLUMN "height" SET DATA TYPE TEXT,
ALTER COLUMN "weight" SET DATA TYPE TEXT;
