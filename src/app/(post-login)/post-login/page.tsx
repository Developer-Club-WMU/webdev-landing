"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function PostLoginRedirect() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;

    const community = session?.user?.communityTag;

    const role = session?.user.role;

    if (!community) {
      router.replace("/join-community");
    } else {
      router.replace(`/${role?.toLowerCase()}`);
    }
  }, [status, session, router]);

  return <p className="text-center text-gray-400">Redirecting...</p>;
}
