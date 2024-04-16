import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const authHandler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "email@example.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials) return null;
        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        });

        if (!user) return null;
        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (!isValid) return null;

        // Returning user details on successful authentication
        return { id: user.id, name: user.name, email: user.email };
      }
    })
  ],
  // Include any additional NextAuth.js configuration as needed
  secret: process.env.SECRET,
});

// Export the handler for both GET and POST requests
export const GET = authHandler;
export const POST = authHandler;