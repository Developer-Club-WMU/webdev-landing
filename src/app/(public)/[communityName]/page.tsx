"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import type { CommunityName } from "@prisma/client";
import { api } from "@/trpc/react";

const CommunityPageDelegator = () => {
  // log once
  useEffect(() => {
    console.log("TEST");
  }, []);

  const params = useParams();
  const paramName = typeof params?.communityName === "string" ? params.communityName : undefined;
  const queryName = paramName?.toUpperCase() as CommunityName | undefined;

  // Query officers for this community. If no param yet, do not run.
  const members = api.membership.findUserMemberships.useQuery(
    {
      type: ["OFFICER"],
      communityName: queryName ? [queryName] : "ALL", // schema: array | "ALL"
    },
    { enabled: !!queryName }
  );

  if (!queryName) return <div>No community provided</div>;

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Community: {queryName}</h1>

      {members.isLoading && <p>Loading officers…</p>}
      {members.isError && <p className="text-red-600">Failed to load officers.</p>}

      {members.data && (
        <ul className="list-disc pl-5">
          {members.data.length === 0 && <li>No officers found.</li>}
          {members.data.map((m) => (
            <li key={m.id}>
              {/* adjust fields if you include user relation in query */}
              Membership #{m.id} — userId: {m.userId}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CommunityPageDelegator;
