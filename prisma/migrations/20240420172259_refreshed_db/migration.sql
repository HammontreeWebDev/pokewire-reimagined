-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "image" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pokemon" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "height" TEXT NOT NULL,
    "weight" TEXT NOT NULL,
    "baseExperience" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Pokemon_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Type" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "pokemonId" INTEGER NOT NULL,
    "doubleDamageTo" TEXT[],
    "doubleDamageFrom" TEXT[],
    "halfDamageTo" TEXT[],
    "halfDamageFrom" TEXT[],
    "noDamageTo" TEXT[],
    "noDamageFrom" TEXT[],

    CONSTRAINT "Type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ability" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "effect" TEXT NOT NULL,
    "pokemonId" INTEGER NOT NULL,

    CONSTRAINT "Ability_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Move" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "accuracy" TEXT,
    "power" TEXT,
    "pp" TEXT,
    "effectChance" TEXT,
    "effectDescription" TEXT NOT NULL,
    "damageClass" TEXT NOT NULL,
    "contestType" TEXT NOT NULL,
    "contestNormalUseBefore" TEXT NOT NULL,
    "contestNormalUseAfter" TEXT NOT NULL,
    "contestSuperUseBefore" TEXT NOT NULL,
    "contestSuperUseAfter" TEXT NOT NULL,
    "pokemonId" INTEGER NOT NULL,

    CONSTRAINT "Move_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cry" (
    "id" SERIAL NOT NULL,
    "latest" TEXT NOT NULL,
    "legacy" TEXT NOT NULL,
    "pokemonId" INTEGER NOT NULL,

    CONSTRAINT "Cry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sprite" (
    "id" SERIAL NOT NULL,
    "main" TEXT NOT NULL,
    "latest" TEXT NOT NULL,
    "legacy" TEXT NOT NULL,
    "pokemonId" INTEGER NOT NULL,

    CONSTRAINT "Sprite_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Pokemon_name_key" ON "Pokemon"("name");

-- AddForeignKey
ALTER TABLE "Pokemon" ADD CONSTRAINT "Pokemon_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Type" ADD CONSTRAINT "Type_pokemonId_fkey" FOREIGN KEY ("pokemonId") REFERENCES "Pokemon"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ability" ADD CONSTRAINT "Ability_pokemonId_fkey" FOREIGN KEY ("pokemonId") REFERENCES "Pokemon"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Move" ADD CONSTRAINT "Move_pokemonId_fkey" FOREIGN KEY ("pokemonId") REFERENCES "Pokemon"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cry" ADD CONSTRAINT "Cry_pokemonId_fkey" FOREIGN KEY ("pokemonId") REFERENCES "Pokemon"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sprite" ADD CONSTRAINT "Sprite_pokemonId_fkey" FOREIGN KEY ("pokemonId") REFERENCES "Pokemon"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
