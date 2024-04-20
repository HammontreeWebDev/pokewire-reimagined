import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth/next";
import { authHandler } from "@/app/api/auth/[...nextauth]/route";

const prisma = new PrismaClient();

export async function POST(request) {
    try {
        const session = await getServerSession(authHandler);
        // TODO: for some reason returning image instead of id - also for newPokemon will have to explicitly pass every field in unfortunately i think.
        console.log('SESSION DETAILS:',session.user)

        if (!session) {
            return new Response(JSON.stringify({ error: "You must be signed in to save Pokémon." }), { status: 401 });
        }

        const { pokemonData } = request.body;

        const newPokemon = await prisma.pokemon.create({
            data: {
                ...pokemonData,
            }
        });

        return new Response(JSON.stringify(newPokemon), { status: 200, headers: { 'Content-Type': 'application/json' } });
    } catch (error) {
        console.error("Error processing request:", error);
        return new Response(JSON.stringify({ error: "Failed to process request" }), { status: 500 });
    }
}
