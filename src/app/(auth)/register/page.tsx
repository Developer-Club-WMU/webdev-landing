"use client";

import Link from "next/link";

const SignUpForm = () => {
  return (
    <div className="flex h-full max-h-[600px] w-full max-w-md flex-col justify-between gap-6 rounded-2xl bg-white p-6 shadow-2xl ring-1 ring-black/10 transition hover:shadow-xl">
      <div className="text-2xl font-bold text-black">Sign Up</div>

      <form className="flex flex-col gap-4">
        <div className="flex flex-col gap-1 text-black">
          <label htmlFor="email">Username</label>
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
        <div className="flex flex-col gap-1 text-black">
          <label htmlFor="confirm">Confirm Password</label>
          <input
            id="confirm"
            type="password"
            name="confirm"
            placeholder="Confirm Password"
            className="rounded-lg border border-black/20 bg-white px-4 py-2 text-sm text-black placeholder:text-black/50 focus:border-black focus:ring-2 focus:ring-black focus:outline-none"
          />
        </div>

        <button
          type="submit"
          className="w-full cursor-pointer rounded-lg border border-black bg-black px-4 py-2 text-sm font-semibold text-white transition hover:bg-white hover:text-black"
        >
          Register
        </button>
      </form>

      <div className="text-center text-sm text-black/60">or</div>

      <button className="flex w-full items-center justify-center gap-2 rounded-lg border border-black/20 bg-black px-4 py-2 text-sm font-semibold text-white transition hover:bg-white hover:text-black">
        💬 Continue with Discord
      </button>

      <div className="">
        Already have an account?
        <Link href={"/auth/signin"} className="text-blue-500">
          {" "}
          Login Here
        </Link>
      </div>
    </div>
  );
};

export default SignUpForm;
