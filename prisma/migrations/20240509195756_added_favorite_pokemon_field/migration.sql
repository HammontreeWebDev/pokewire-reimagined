-- AlterTable
ALTER TABLE "User" ADD COLUMN     "favoritePokemon" TEXT[] DEFAULT ARRAY[]::TEXT[];
