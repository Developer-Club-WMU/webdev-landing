"use client";

import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Suspense } from "react";

const LoginFormContent = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const callbackUrl = "/post-login";

  // If session is valid, skip form and redirect
  useEffect(() => {
    if (status === "authenticated" && session) {
      router.replace(callbackUrl);
    }
  }, [status, session, router]);

  if (status === "loading") {
    return (
      <div className="flex h-full w-full items-center justify-center text-black">
        Checking session...
      </div>
    );
  }

  if (status === "authenticated") {
    // While redirecting
    return (
      <div className="flex h-full w-full items-center justify-center text-black">
        Redirecting...
      </div>
    );
  }

  // Not signed in, show login UI
  return (
    <div className="flex h-full max-h-[600px] w-full max-w-md flex-col justify-between gap-6 rounded-2xl bg-white p-6 shadow-2xl ring-1 ring-black/10 transition hover:shadow-xl">
      <div className="text-2xl font-bold text-black">Login</div>

      <div className="text-center text-sm text-black/60">
        We use Discord for many things...
      </div>

      <button
        className="flex w-full items-center justify-center gap-3 rounded-lg border border-gray-700 bg-black px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-white hover:text-black hover:border-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer"
        onClick={() => signIn("discord", { callbackUrl })}
        aria-label="Sign in with Discord"
      >
        <span>Continue with Discord</span>
      </button>
    </div>
  );
};

const LoginForm = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginFormContent />
    </Suspense>
  );
};

export default LoginForm;
