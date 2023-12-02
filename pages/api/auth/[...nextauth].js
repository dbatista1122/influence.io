import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import TwitterProvider, { TwitterLegacy } from "next-auth/providers/twitter";
import bcrypt from "bcrypt";
import prisma from "../../../lib/prisma";
import nextAuth from "next-auth";

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    }),
    TwitterProvider({
      
      clientId: process.env.TWITTER_CLIENT_ID,
      clientSecret: process.env.TWITTER_CLIENT_SECRET,
      //version: "1.0A"
      version: "2.0",
      checks: ["pkce", "state"],
      
      /*
      version: "2.0",
      authorization: {
        url: "https://twitter.com/i/oauth2/authorize",
        params: {
          scope: "tweet.read tweet.write tweet.moderate.write users.read follows.read follows.write offline.access space.read mute.read mute.write like.read like.write list.read list.write block.read block.write bookmark.read bookmark.write",
        },
      },
      token: {
        url: "https://api.twitter.com/2/oauth2/token",
      },
      */
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
    /*
    async signIn({ user, account, profile, email, credentials}){
      const authorizationURL = account.profile_url;
      const urlParams = new URLSearchParams(authorizationURL.split('?')[1]);
      const codeChallenge = urlParams.get('code_challenge');
      console.log('code_challenge: ', codeChallenge);
      this.session.codeChallenge = codeChallenge;
      return true;
    },
    */
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
/*
export const config = {
  adapter: PrismaAdapter(prisma),
  providers: [
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID,
      clientSecret: process.env.TWITTER_CLIENT_SECRET,
      version: "2.0",
      checks: ["pkce", "state"],
      /*
      version: "2.0",
      authorization: {
        url: "https://twitter.com/i/oauth2/authorize",
        params: {
          scope: "tweet.read tweet.write tweet.moderate.write users.read follows.read follows.write offline.access space.read mute.read mute.write like.read like.write list.read list.write block.read block.write bookmark.read bookmark.write",
        },
      },
      token: {
        url: "https://api.twitter.com/2/oauth2/token",
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
}
*/
