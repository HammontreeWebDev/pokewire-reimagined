-- AlterTable
ALTER TABLE "Pokemon" ADD COLUMN     "routes" JSONB;

-- CreateTable
CREATE TABLE "Routes" (
    "id" SERIAL NOT NULL,
    "location_name" TEXT NOT NULL,

    CONSTRAINT "Routes_pkey" PRIMARY KEY ("id")
);
