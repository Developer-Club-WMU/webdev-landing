import { PrismaAdapter } from "@auth/prisma-adapter";
import { type DefaultSession, type NextAuthConfig } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";

import { db } from "@/server/db";
import { env } from "@/env";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 */
export const authConfig = {
  adapter: PrismaAdapter(db),
  secret: env.AUTH_SECRET,
  debug: true,
  basePath: "/api/auth",
  trustHost: true, // ✅ Include this for local prod testing
  ...(env.NEXTAUTH_URL && { url: env.NEXTAUTH_URL }),
  providers: [
    DiscordProvider({
      clientId: env.AUTH_DISCORD_ID,
      clientSecret: env.AUTH_DISCORD_SECRET,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      console.log("JWT callback — token BEFORE:", token);
      if (user) {
        token.id = user.id;
        token.email = user.email!;
        console.log("JWT callback — user detected, token updated TO:", token);
      }
      return token;
    },
    async session({ session, token }) {
      console.log("SESSION callback — token:", token);
      console.log("SESSION callback — session BEFORE:", session);
      if (token) {
        session.user.id = token.id as string;
        session.user.email = token.email!;
        console.log("SESSION callback — session updated TO:", session);
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      console.log("REDIRECT callback — url:", url, "baseUrl:", baseUrl);
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },
} satisfies NextAuthConfig;
