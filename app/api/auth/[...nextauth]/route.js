import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const authOptions = {
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
          // console.log('Authorization Check:', user);
          return { id: user.id, name: user.name, email: user.email, image: user.image, favoritePokemon: user.favoritePokemon };
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
    async jwt({ token, user }) {
      if (user) {
        token.uid = user.id;
        token.email = user.email;
        token.name = user.name;
        token.image = user.image;
        token.favoritePokemon = user.favoritePokemon;
      }
      // console.log('JWT token generation:', token);
      return token;
    },
    async session({ session, token }) {
      session.user = {
        id: token.uid,
        email: token.email,
        name: token.name,
        image: token.image,
        favoritePokemon: token.favoritePokemon,
      }
      // console.log('session check:', session)
      return session;
    },
    cookies: {
      sessionToken: {
        name: `__Secure-next-auth.session-token`,
        options: {
          httpOnly: true,
          sameSite: 'Lax',
          path:'/',
          secure: true
        }
      }
    }
  }
};

const authHandler = NextAuth(authOptions);
// Handling GET and POST requests
export {authHandler as GET, authHandler as POST};