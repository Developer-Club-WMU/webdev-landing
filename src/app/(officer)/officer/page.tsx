import { auth } from "@/server/auth";
import { redirect } from "next/navigation";
import OfficerClient from "./_components/OfficerClient";

export const dynamic = "force-dynamic";

export default async function OfficerPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/auth/signin");
  }

  return <OfficerClient />;
}
