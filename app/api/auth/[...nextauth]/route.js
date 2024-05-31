import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "email@example.com" },
        password: { label: "Password", type: "password" }
      },
      authorize: async (credentials) => {
        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        });

        if (user && (await bcrypt.compare(credentials.password, user.password))) {
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            image: user.image,
            favoritePokemon: user.favoritePokemon,
          };
        }
        return null;
      }
    })
  ],
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.image = user.image;
        token.favoritePokemon = user.favoritePokemon;
      }
      if (trigger === 'update' && session) {
        if (session.favoritePokemon) {
          token.favoritePokemon = session.favoritePokemon;
        }
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        id: token.id,
        email: token.email,
        name: token.name,
        image: token.image,
        favoritePokemon: token.favoritePokemon,
      };
      return session;
    }
  }
};

const authHandler = NextAuth(authOptions);
export { authHandler as GET, authHandler as POST };
