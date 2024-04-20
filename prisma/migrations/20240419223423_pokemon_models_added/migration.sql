-- CreateTable
CREATE TABLE "Pokemon" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "height" INTEGER NOT NULL,
    "weight" INTEGER NOT NULL,
    "base_experience" INTEGER NOT NULL,
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
    "is_hidden" BOOLEAN NOT NULL,
    "slot" INTEGER NOT NULL,
    "effect" TEXT NOT NULL,
    "pokemonId" INTEGER NOT NULL,

    CONSTRAINT "Ability_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Move" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "accuracy" INTEGER,
    "power" INTEGER,
    "pp" INTEGER NOT NULL,
    "effect_chance" INTEGER,
    "effect_description" TEXT NOT NULL,
    "damage_class" TEXT NOT NULL,
    "contest_type" TEXT NOT NULL,
    "contest_normal_use_before" TEXT NOT NULL,
    "contest_normal_use_after" TEXT NOT NULL,
    "contest_super_use_before" TEXT NOT NULL,
    "contest_super_use_after" TEXT NOT NULL,
    "pokemonId" INTEGER NOT NULL,

    CONSTRAINT "Move_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cry" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "pokemonId" INTEGER NOT NULL,

    CONSTRAINT "Cry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sprite" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "pokemonId" INTEGER NOT NULL,

    CONSTRAINT "Sprite_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Pokemon_name_key" ON "Pokemon"("name");

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
