import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const prisma = new PrismaClient();

export async function GET(request, context) {

    const { params } = context;
    const pokemonName = params.pokemon;

    try {
        const session = await getServerSession(authOptions);

        if (!session) {
            return new Response(JSON.stringify({ error: "You must be signed in to view saved Pokémon." }), { status: 401 });
        }


        console.log('Pokemon Name:', pokemonName);
        console.log('session:', session.user.id);

        const userPokemon = await prisma.pokemon.findUnique({
            where: {
                userId: session.user.id,
                name: pokemonName,
            },
            include: {
                types: true,
                abilities: true,
                moves: true,
                cries: true,
                sprites: true,
            }
        });

        if (!userPokemon) {
            return new Response(JSON.stringify({ error: 'No Pokemon found with this name' }), { status: 404 })
        }

        return new Response(JSON.stringify(userPokemon), { status: 200, headers: { 'Content-Type': 'application/json' } });
    } catch (error) {
        console.error("Error fetching pokemon for user:", error);
        return new Response(JSON.stringify({ error: 'Failed to fetch pokemon' }), { status: 500 })
    }

}