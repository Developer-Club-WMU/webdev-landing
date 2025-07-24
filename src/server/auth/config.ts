import { PrismaAdapter } from "@auth/prisma-adapter";
import { type DefaultSession, type NextAuthConfig } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";

import { db } from "@/server/db";
import { env } from "@/env";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authConfig = {
  adapter: PrismaAdapter(db),
  secret: env.AUTH_SECRET,
  basePath: "/api/auth",
  ...(env.NEXTAUTH_URL && { url: env.NEXTAUTH_URL }),
  providers: [DiscordProvider],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email!;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.email = token.email!;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      // Debug logging for production troubleshooting
      if (process.env.NODE_ENV === "production") {
        console.log("NextAuth Redirect Debug:", {
          url,
          baseUrl,
          NEXTAUTH_URL: env.NEXTAUTH_URL,
          NODE_ENV: process.env.NODE_ENV,
        });
      }

      // Allows relative callback URLs
      if (url.startsWith("/")) {
        const redirectUrl = `${baseUrl}${url}`;
        console.log("Relative redirect:", redirectUrl);
        return redirectUrl;
      }

      // Allows callback URLs on the same origin
      if (new URL(url).origin === baseUrl) {
        console.log("Same origin redirect:", url);
        return url;
      }

      // In production, ensure we're using the correct base URL
      const productionUrl = env.NEXTAUTH_URL || baseUrl;
      console.log("Default redirect:", productionUrl);

      return productionUrl;
    },
  },
} satisfies NextAuthConfig;
