
import {
  createTRPCRouter,
} from "@/server/api/trpc";
import { tasksRouter } from "./tasks";

export const crmRouter = createTRPCRouter({
  tasks: tasksRouter
});
