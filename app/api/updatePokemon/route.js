import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";

const prisma = new PrismaClient();

export async function PUT(request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new Response(JSON.stringify({ error: "You must be signed in to update pokemon" }), { status: 401 });
    }

    const { name, routes } = await request.json();

    if (!routes) {
      return new Response(JSON.stringify({ error: 'No Route Data Provided' }), { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id }
    });

    if (!user) {
      return new Response(JSON.stringify({ error: 'User Not Found' }), { status: 404 });
    }

    const pokemon = await prisma.pokemon.findFirst({
      where: { userId: user.id, name: name },
    });

    if (!pokemon) {
      return new Response(JSON.stringify({ error: 'Pokemon Not Found' }), { status: 404 });
    }

    const updatedPokemon = await prisma.pokemon.update({
      where: { id: pokemon.id },
      data: { routes: routes },
    });

    return new Response(JSON.stringify(updatedPokemon), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error("Error updating pokemon routes:", error);
    return new Response(JSON.stringify({ error: 'Failed to update pokemon routes' }), { status: 500 });
  }
}

export async function GET(request) {
  return new Response("GET method not allowed", { status: 405 });
}

export async function POST(request) {
  return new Response("POST method not allowed", { status: 405 });
}

export async function DELETE(request) {
  return new Response("DELETE method not allowed", { status: 405 });
}
