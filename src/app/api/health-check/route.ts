import { env } from "@/env";

export async function GET() {
  const mode = env.NODE_ENV === "production" ? "Production mode" : "Dev mode";
  return Response.json({ message: mode });
}
