/*
  Warnings:

  - Changed the type of `doubleDamageTo` on the `Type` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `doubleDamageFrom` on the `Type` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `halfDamageTo` on the `Type` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `halfDamageFrom` on the `Type` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `noDamageTo` on the `Type` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `noDamageFrom` on the `Type` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Type" DROP COLUMN "doubleDamageTo",
ADD COLUMN     "doubleDamageTo" JSONB NOT NULL,
DROP COLUMN "doubleDamageFrom",
ADD COLUMN     "doubleDamageFrom" JSONB NOT NULL,
DROP COLUMN "halfDamageTo",
ADD COLUMN     "halfDamageTo" JSONB NOT NULL,
DROP COLUMN "halfDamageFrom",
ADD COLUMN     "halfDamageFrom" JSONB NOT NULL,
DROP COLUMN "noDamageTo",
ADD COLUMN     "noDamageTo" JSONB NOT NULL,
DROP COLUMN "noDamageFrom",
ADD COLUMN     "noDamageFrom" JSONB NOT NULL;
