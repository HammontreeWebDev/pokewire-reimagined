import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const prisma = new PrismaClient();

export async function GET(request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session) {
            return new Response(JSON.stringify({ error: "You must be signed in to view saved Pokémon." }), { status: 401 });
        }

        const userPokemons = await prisma.pokemon.findMany({
            where: {
                userId: session.user.id
            },
            include: {
                types: true,
                abilities: true,
                moves: true,
                cries: true,
                sprites: true,
            }
        });

        if (!userPokemons.length) {
            return new Response(JSON.stringify({error: 'No Pokemon found for this user'}), {status: 404})
        }

        return new Response(JSON.stringify(userPokemons), {status: 200, headers: {'Content-Type' : 'application/json'}});
    } catch (error) {
        console.error("Error fetching all pokemon for user:", error);
        return new Response(JSON.stringify({error: 'Failed to fetch pokemon'}), {status: 500})
    }
}