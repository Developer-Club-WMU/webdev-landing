import { useState } from "react";
import { api } from "@/trpc/react"; // adjust import to your app
import { membershipRoleEnum } from "@/server/api/routers/api";
import type { CommunityName, MembershipRole } from "@prisma/client";

// Array of enum values for UI selects
export const ROLE_OPTIONS = Object.values(membershipRoleEnum.enum);

export default function AttachMembershipForm() {
  const [email, setEmail] = useState("");
  const [community, setCommunity] = useState<CommunityName>("WEB");
  const [role, setRole] = useState<(MembershipRole)>("MEMBER");

  const utils = api.useUtils();

  // Load visible communities to pick from
  const { data: communities, isLoading: loadingCommunities } =
    api.community.grabAll.useQuery({ isVisible: "all" });

  const attach = api.membership.attachMembershipToUserByEmail.useMutation({
    onSuccess: async () => {
      await utils.invalidate(); // invalidate related queries
    },
  });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !community || !role) return;

    attach.mutate({
      email,
      communityName: community,
      role: role,
    });
  };

  return (
    <form
          onSubmit={onSubmit}
          className="max-w-md p-4 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
        >
          <h3 className="text-lg font-semibold mb-4">Attach Membership to User</h3>

          <label className="block mb-3">
            <span className="block mb-1">Email</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-md border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            />
          </label>

          <label className="block mb-3">
            <span className="block mb-1">Community</span>
            <select
              value={community}
              onChange={(e) => setCommunity(e.target.value as CommunityName)}
              required
              disabled={loadingCommunities}
              className="w-full px-3 py-2 border rounded-md border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            >
              <option value="" disabled>
                {loadingCommunities ? "Loading..." : "Select community"}
              </option>
              {communities?.map((c) => (
                <option key={c.id} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
          </label>

          <label className="block mb-3">
            <span className="block mb-1">Role</span>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as MembershipRole)}
              required
              className="w-full px-3 py-2 border rounded-md border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            >
              {ROLE_OPTIONS.map((r, i) => (
                <option key={i} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </label>

          <button
            type="submit"
            disabled={loadingCommunities}
            className="mt-4 px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 dark:bg-blue-500 dark:hover:bg-blue-600"
          >
            {loadingCommunities ? "Attaching..." : "Attach Membership"}
          </button>

          {attach.isSuccess && attach.data?.ok && (
            <p className="mt-3 text-green-600 dark:text-green-400">
              Membership attached. ID: {attach.data.membershipId}
            </p>
          )}
          {attach.isSuccess && attach.data && !attach.data.ok && (
            <p className="mt-3 text-red-600 dark:text-red-400">
              {String(attach.data.data)}
            </p>
          )}
          {attach.isError && (
            <p className="mt-3 text-red-600 dark:text-red-400">
              {attach.error.message}
            </p>
          )}
        </form>
  );
}
