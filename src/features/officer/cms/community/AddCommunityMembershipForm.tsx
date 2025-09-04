"use client";

import { useState } from "react";
import { MembershipRole } from "@prisma/client";
import { api } from "@/trpc/react";
import { useCachedSession } from "@/hooks/userCachedSession";

export default function AddMembershipForm() {
  const session = useCachedSession();
  const userId = session.data?.user.id;

  const [role, setRole] = useState<MembershipRole>(MembershipRole.MEMBER);
  const [communityId, setCommunityId] = useState<string>("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const { data: communities, isLoading } = api.community.grabAll.useQuery({isVisible: "all"});
  const utils = api.useUtils();
  const addMembership = api.membership.createMembership.useMutation({
    onSuccess: async () => {
      setSuccess("Membership added successfully.");
      setError("");
      await utils.membership.invalidate();
    },
    onError: (err) => {
      setSuccess("");
      setError(err.message);
    },
  });

  if (!userId) return <div>No user ID found</div>;
  if (isLoading) return <div>Loading communities...</div>;
  if (!communities) return <div>No communities found</div>;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId || !communityId) {
      setError("Missing required fields.");
      return;
    }

    addMembership.mutate({ userId, communityId, role });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-white p-4 rounded shadow max-w-md"
    >
      <h2 className="text-lg font-bold">Add Membership</h2>

      <label className="block text-sm font-medium">
        Select Community
        <select
          value={communityId}
          onChange={(e) => setCommunityId(e.target.value)}
          className="mt-1 w-full border px-3 py-2 rounded"
        >
          <option value="" disabled>
            -- Select a community --
          </option>
          {communities.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </label>

      <label className="block text-sm font-medium">
        Select Role
        <select
          value={role}
          onChange={(e) => setRole(e.target.value as MembershipRole)}
          className="mt-1 w-full border px-3 py-2 rounded"
        >
          {Object.values(MembershipRole).map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
      </label>

      {error && <p className="text-sm text-red-500">{error}</p>}
      {success && <p className="text-sm text-green-600">{success}</p>}

      <button
        type="submit"
        disabled={addMembership.isPending}
        className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
      >
        {addMembership.isPending ? "Adding..." : "Add Membership"}
      </button>
    </form>
  );
}
