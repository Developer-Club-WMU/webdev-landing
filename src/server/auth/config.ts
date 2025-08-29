import { PrismaAdapter } from "@auth/prisma-adapter";
import { type DefaultSession, type NextAuthConfig } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";

import { db } from "@/server/db";
import { env } from "@/env";
import { MembershipRole, type CommunityName } from "@prisma/client";

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

/** Highest → lowest via rank number (smaller = higher) */
const ROLE_RANK = {
  ADMIN: 0,
  OFFICER: 1,
  MEMBER: 2,
  CLIENT: 3,
} as const satisfies Record<MembershipRole, number>;

// Runtime exhaustiveness check: fails fast if enum changes and map is stale
(function assertRoleRankCoversEnum() {
  const all = Object.values(MembershipRole) as MembershipRole[];
  const missing = all.filter((r) => ROLE_RANK[r] === undefined);
  if (missing.length)
    throw new Error(`ROLE_RANK missing: ${missing.join(", ")}`);
})();

const rank = (r: MembershipRole) => ROLE_RANK[r];
const better = (a: MembershipRole | undefined, b: MembershipRole) =>
  a === undefined || rank(b) < rank(a) ? b : a;

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
      clientSecret: env.AUTH_DISCORD_SECRET,
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

          const memberships = await db.communityMembership.findMany({
            where: { userId: user.id },
            include: { community: true, roles: true },
          });

          if (!memberships.length) return token;

          // Highest role per community
          const perCommunity = new Map<CommunityName, MembershipRole>();
          for (const m of memberships) {
            let highest: MembershipRole | undefined;
            for (const rr of m.roles) highest = better(highest, rr.role);
            if (highest) perCommunity.set(m.community.name, highest);
          }
          if (!perCommunity.size) return token;

          // Global highest across communities
          let bestRole: MembershipRole | undefined;
          let bestCommunity: CommunityName | undefined;
          for (const [c, r] of perCommunity) {
            if (!bestRole || rank(r) < rank(bestRole)) {
              bestRole = r;
              bestCommunity = c;
            }
          }

          token.role = bestRole;
          token.communityTag = bestCommunity;
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
