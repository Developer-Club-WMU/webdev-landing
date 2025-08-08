import { CommunityName } from "@prisma/client";
import z from "zod";

export const communityNamesEnum = z.nativeEnum(CommunityName);
