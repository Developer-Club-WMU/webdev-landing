import { MembershipRole } from "@prisma/client";
import z from "zod";

export const membershipRoleEnum = z.nativeEnum(MembershipRole);
