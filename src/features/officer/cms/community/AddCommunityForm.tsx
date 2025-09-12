"use client";

import { useState } from "react";
import { CommunityName } from "@prisma/client";
import { useRouter } from "next/navigation";
import { api } from "@/trpc/react";

const AddCommunityForm = () => {
  const router = useRouter();
  const [selected, setSelected] = useState<CommunityName>("WEB");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const utils = api.useUtils();

  const createCommunity = api.community.createCommunity.useMutation({
    onSuccess: async () => {
      await utils.community.invalidate();
      router.refresh(); // You can also redirect somewhere if needed
    },
    onError: (err) => {
      setError(err.message);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    createCommunity.mutate({ name: selected, description });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md space-y-4 p-6 bg-white dark:bg-zinc-900 rounded shadow"
    >
      <h2 className="text-xl font-bold text-black dark:text-white">Create New Community</h2>

      <label className="block">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Select Community
        </span>
        <select
          value={selected}
          onChange={(e) => setSelected(e.target.value as CommunityName)}
          className="mt-1 w-full border rounded px-3 py-2 dark:bg-zinc-800 dark:text-white"
        >
          {Object.values(CommunityName).map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
      </label>

      <label className="block">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Description (optional)
        </span>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1 w-full border rounded px-3 py-2 dark:bg-zinc-800 dark:text-white"
          rows={3}
        />
      </label>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button
        type="submit"
        disabled={createCommunity.status === "pending"}
        className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 disabled:opacity-50"
      >
        {createCommunity.status === "pending" ? "Creating..." : "Create Community"}
      </button>
    </form>
  );
};

export default AddCommunityForm;
