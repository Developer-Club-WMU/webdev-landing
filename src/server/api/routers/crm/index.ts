import { createTRPCRouter } from "@/server/api/trpc";
import { tasksRouter } from "./tasks";
import { pipelineRouter } from "./pipeline";
import { leadRouter } from "./lead";

export const crmRouter = createTRPCRouter({
  tasks: tasksRouter,
  pipelines: pipelineRouter,
  leads: leadRouter,
});
