"use client";

import Link from "next/link";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

const LoginFormContent = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/";

  return (
    <div className="flex h-full max-h-[600px] w-full max-w-md flex-col justify-between gap-6 rounded-2xl bg-white p-6 shadow-2xl ring-1 ring-black/10 transition hover:shadow-xl">
      <div className="text-2xl font-bold text-black">Login</div>

      <form className="flex flex-col gap-4">
        <div className="flex flex-col gap-1 text-black">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="Email"
            className="rounded-lg border border-black/20 bg-white px-4 py-2 text-sm text-black placeholder:text-black/50 focus:border-black focus:ring-2 focus:ring-black focus:outline-none"
          />
        </div>

        <div className="flex flex-col gap-1 text-black">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            placeholder="Password"
            className="rounded-lg border border-black/20 bg-white px-4 py-2 text-sm text-black placeholder:text-black/50 focus:border-black focus:ring-2 focus:ring-black focus:outline-none"
          />
        </div>

        <button
          type="submit"
          className="w-full cursor-pointer rounded-lg border border-black bg-black px-4 py-2 text-sm font-semibold text-white transition hover:bg-white hover:text-black"
        >
          Login
        </button>
      </form>

      <div className="text-center text-sm text-black/60">or</div>

      <button
        className="flex w-full items-center justify-center gap-2 rounded-lg border border-black/20 bg-black px-4 py-2 text-sm font-semibold text-white transition hover:bg-white hover:text-black"
        onClick={() => {
          console.log("Attempting Discord sign-in with callback:", callbackUrl);
          return signIn("discord", { callbackUrl });
        }}
      >
        <span className="text-blue-500">💬 Continue with Discord</span>
      </button>

      <div className="">
        Don&apos;t have an account?
        <Link href="/register" className="text-blue-500">
          {" "}
          Sign up here
        </Link>
      </div>
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
