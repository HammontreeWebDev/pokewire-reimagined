import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const prisma = new PrismaClient();

export async function POST(request) {
    try {
        const session = await getServerSession(authOptions);
        // TODO: for some reason returning image instead of id - also for newPokemon will have to explicitly pass every field in unfortunately i think.
        console.log('SESSION DETAILS:', session)

        if (!session) {
            return new Response(JSON.stringify({ error: "You must be signed in to save Pokémon." }), { status: 401 });
        }

        const { pokemonData } = await request.json();
        if (!pokemonData) {
            return new Response(JSON.stringify({ error: 'No Pokemon Data Provided' }), { status: 400 });
        }

        // console.log('POKEMON DATA:', pokemonData.types);
        // console.log('userId:', session.user.id);

        const user = await prisma.user.findUnique({
            where: {id: session.user.id}
        });

        if (!user) {
            return new Response(JSON.stringify({error: 'User Not Found'}), {status: 404});
        }

        const newPokemon = await prisma.pokemon.create({
            data: {
                name: pokemonData.name,
                userId: session.user.id,
                height: pokemonData.height,
                weight: pokemonData.weight,
                baseExperience: pokemonData.baseExperience,
                types: {
                    create: pokemonData.types.map(type => ({
                        name: type.name,
                        doubleDamageTo: type.doubleDamageTo,
                        doubleDamageFrom: type.doubleDamageFrom,
                        halfDamageTo: type.halfDamageTo,
                        halfDamageFrom: type.halfDamageFrom,
                        noDamageTo: type.noDamageTo,
                        noDamageFrom: type.noDamageFrom,
                    })),
                },
                abilities: {
                    create: pokemonData.abilities.map(ability => ({
                        name: ability.name,
                        effect: ability.effect,
                    })),
                },
                moves: {
                    create: pokemonData.moves.map(move => ({
                        name: move.name,
                        accuracy: move.accuracy,
                        power: move.power,
                        pp: move.pp,
                        effectChance: move.effectChance,
                        effectDescription: move.effectDescription,
                        damageClass: move.damageClass,
                        contestType: move.contestType,
                        contestNormalUseBefore: move.contestNormalUseBefore,
                        contestNormalUseAfter: move.contestNormalUseAfter,
                        contestSuperUseBefore: move.contestSuperUseBefore,
                        contestSuperUseAfter: move.contestSuperUseAfter,
                    })),
                },
                cries: {
                    create: pokemonData.cries.map(cry => ({
                        latest: cry.latest,
                        legacy: cry.legacy,
                    })),
                },
                sprites: {
                    create: pokemonData.sprites.map(sprite => ({
                        main: sprite.main,
                        latest: sprite.latest,
                        legacy: sprite.legacy,
                    })),
                },
            }
        });

        return new Response(JSON.stringify(newPokemon), { status: 200, headers: { 'Content-Type': 'application/json' } });
    } catch (error) {
        console.error("Error processing request:", error);
        return new Response(JSON.stringify({ error: "Failed to process request" }), { status: 500 });
    }
}
