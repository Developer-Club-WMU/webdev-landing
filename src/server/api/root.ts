import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";
import { crmRouter } from "./routers/crm";
import { communityQuestionsRouter } from "./routers/public/community-questions";
import { userRouter } from "./routers/user";
import { joinCommunityFormRouter } from "./routers/cms/join-community-form";
import { communityRouter } from "./routers/cms/community";
import { membershipRouter } from "./routers/membership";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  crm: crmRouter,
  communityQuestions: communityQuestionsRouter,
  user: userRouter,
  communityForms: joinCommunityFormRouter,
  community: communityRouter,
  membership: membershipRouter,
  // post: postRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
