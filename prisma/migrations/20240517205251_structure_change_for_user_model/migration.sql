-- AlterTable
ALTER TABLE "User" ALTER COLUMN "favoritePokemon" SET NOT NULL,
ALTER COLUMN "favoritePokemon" SET DEFAULT '',
ALTER COLUMN "favoritePokemon" SET DATA TYPE TEXT;
