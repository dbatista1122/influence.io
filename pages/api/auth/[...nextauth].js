import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import TwitterProvider from "next-auth/providers/twitter";
import bcrypt from "bcrypt";
import prisma from "../../../lib/prisma";

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    }),
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID,
      clientSecret: process.env.TWITTER_CLIENT_SECRET,
    }),
    CredentialsProvider({
      type: "credentials",
      credentials: {
        email: { type: "text", placeholder: "test@test.com" },
        password: { type: "password", placeholder: "password" },
      },
      async authorize(credentials) {
        console.log("This is running!!");
        const { email, password } = credentials;
        const user = await prisma.user.findUnique({
          where: { email },
        });
        if (!user) return null;
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return null;
        console.log(user);
        return user;
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      return { session, token };
    },
    jwt({ token }) {
      return token;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
});
