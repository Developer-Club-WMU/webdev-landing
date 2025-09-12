"use client";

import { useState } from "react";
import { api } from "@/trpc/react";

export default function ToggleAdminForm() {
  const [email, setEmail] = useState("");

  const toggle = api.user.toggleAdmin.useMutation(); // adjust path if different

  const onToggle = () => {
    if (!email) return;
    toggle.mutate({ email });
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onToggle();
      }}
      className="max-w-md rounded-lg border border-gray-300 bg-white p-4 text-gray-900 shadow dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
    >
      <h3 className="mb-4 text-lg font-semibold">Toggle Admin Role</h3>

      <label className="mb-3 block">
        <span className="mb-1 block">User Email</span>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
        />
      </label>

      <div className="flex items-center justify-between">
        <button
          type="submit"
          disabled={toggle.isPending || !email}
          className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50 dark:bg-blue-500 dark:hover:bg-blue-600"
        >
          {toggle.isPending ? "Toggling…" : "Toggle Admin"}
        </button>

        {/* Optional toggle-style control that calls the same mutation */}
        <label className="inline-flex cursor-pointer items-center gap-2 text-sm">
          <input
            type="checkbox"
            onChange={onToggle}
            disabled={toggle.isPending || !email}
            className="peer sr-only"
          />
          <span
            className="h-6 w-11 rounded-full bg-gray-300 peer-disabled:opacity-50 peer-checked:bg-blue-600 dark:bg-gray-700 dark:peer-checked:bg-blue-500"
            aria-hidden
          />
          <span className="text-gray-700 dark:text-gray-300">Quick toggle</span>
        </label>
      </div>

      {/* feedback */}
      {toggle.isSuccess && (
        <p
          className={`mt-3 text-sm ${
            toggle.data.ok ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
          }`}
        >
          {toggle.data.message}
          {toggle.data.ok && toggle.data.user ? ` (now ${toggle.data.user.userRole})` : null}
        </p>
      )}
      {toggle.isError && (
        <p className="mt-3 text-sm text-red-600 dark:text-red-400">{toggle.error.message}</p>
      )}
    </form>
  );
}
