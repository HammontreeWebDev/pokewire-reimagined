import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "email@example.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const user = await prisma.user.findUnique({
          where: { email: credentials?.email }
        });

        if (user && await bcrypt.compare(credentials?.password, user.password)) {
          return { id: user.id, name: user.name, email: user.email };
        }
        return null;
      }
    })
  ],
  secret: process.env.SECRET,
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async session({ session, token }) {
      session.user.id = token.uid;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.uid = user.id;
      }
      return token;
    }
  }
};

export const authHandler = NextAuth(authOptions);

// Handling GET and POST requests
export const GET = async (req, res) => {
  return authHandler(req, res);
};

export const POST = async (req, res) => {
  return authHandler(req, res);
};