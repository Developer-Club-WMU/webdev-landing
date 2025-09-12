import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import type { Session } from "next-auth";

let cachedSession: Session | null = null;

export function useCachedSession() {
  const { data: session, status } = useSession();
  const [localSession, setLocalSession] = useState<Session | null>(
    () => cachedSession
  );

  useEffect(() => {
    if (status === "authenticated" && session) {
      cachedSession = session;
      setLocalSession(session); // ← always update
    }
  }, [status, session]);

  return {
    data: localSession ?? session, // fallback to session if cache not yet hydrated
    status: session ? "authenticated" : status,
  };
}
