import { PrismaAdapter } from "@auth/prisma-adapter";
import { type DefaultSession, type NextAuthConfig } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";

import { db } from "@/server/db";
import { env } from "@/env";
import type { CommunityName, MembershipRole } from "@prisma/client";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      role?: MembershipRole;
      communityTag?: CommunityName;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    email: string;
    role?: MembershipRole;
    communityTag?: CommunityName;
  }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 */
export const authConfig = {
  adapter: PrismaAdapter(db),
  secret: env.NEXTAUTH_SECRET,
  debug: true,
  basePath: "/api/auth",
  trustHost: true, // ✅ Include this for local prod testing
  ...(env.NEXTAUTH_URL && { url: env.NEXTAUTH_URL }),
  providers: [
    DiscordProvider({
      clientId: env.AUTH_DISCORD_ID,
      clientSecret: env.NEXTAUTH_SECRET,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      try {
        if (user) {
          token.id = user.id!;
          token.email = user.email!;

          const membership = await db.communityMembership.findFirst({
            where: { userId: user.id },
            include: { community: true, roles: true },
          });

          if (membership) {
            const roles = membership.roles;
            let highest: MembershipRole | undefined;
            for (const role of roles) {
              switch (role.role) {
                case "ADMIN":
                  highest = "ADMIN";
                  break;
                case "OFFICER":
                  if (highest !== "ADMIN") highest = "OFFICER";
                  break;
                case "MENTOR":
                  if (!highest || highest === "MEMBER" || highest === "CLIENT")
                    highest = "MENTOR";
                  break;
                case "MEMBER":
                  if (!highest || highest === "CLIENT") highest = "MEMBER";
                  break;
                case "CLIENT":
                  highest ??= "CLIENT";
                  break;
              }
            }
            token.role = highest;
            token.communityTag = membership.community.name;
          }
        }
        return token;
      } catch (e) {
        console.error("ERROR: failed JWT", e);
        return token;
      }
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.email = token.email!;
        session.user.role = token.role;
        session.user.communityTag = token.communityTag;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },
} satisfies NextAuthConfig;
