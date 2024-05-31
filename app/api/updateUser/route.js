import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";

const prisma = new PrismaClient();

export async function PUT(request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new Response(JSON.stringify({ error: "You must be signed in to update user settings" }), { status: 401 });
    }

    const { userData } = await request.json();

    if (!userData) {
      return new Response(JSON.stringify({ error: 'No User Data Provided' }), { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id }
    });

    if (!user) {
      return new Response(JSON.stringify({ error: 'User Not Found' }), { status: 404 });
    }

    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        favoritePokemon: userData.favoritePokemon || user.favoritePokemon,
        image: userData.image || user.image,
      }
    });

    return new Response(JSON.stringify(updatedUser), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error("Error updating settings for user:", error);
    return new Response(JSON.stringify({ error: 'Failed to update user settings' }), { status: 500 });
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
