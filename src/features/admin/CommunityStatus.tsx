"use client";

import { communityNamesEnum } from "@/api/apis";
import { api } from "@/trpc/react";
import { type CommunityName } from "@prisma/client";
import { useState } from "react";

export default function CommunityHealthDashboard() {
  const [activating, setActivating] = useState<CommunityName | null>(null);

  const utils = api.useUtils();
  const { data: existingCommunities, isLoading } = api.community.grabAll.useQuery({isVisible: "all"});
  const createCommunity = api.community.createCommunity.useMutation({
    onSuccess: async () => {
      await utils.community.grabAll.invalidate();
      setActivating(null);
    },
    onError: () => setActivating(null),
  });

  const handleActivate = (communityName: CommunityName) => {
    setActivating(communityName);
    createCommunity.mutate({
      name: communityName,
      description: `${communityName} community`,
    });
  };

  const allCommunities: CommunityName[] = Object.values(communityNamesEnum.enum);
  const existingNames = new Set(existingCommunities?.map((c) => c.name));

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {allCommunities.map((name) => {
        const exists = existingNames.has(name);
        return (
          <div
            key={name}
            className={`rounded-lg border p-4 shadow ${
              exists ? "border-green-400 bg-green-50" : "border-red-400 bg-red-50"
            }`}
          >
            <h3 className="text-lg font-semibold mb-2">{name}</h3>
            <p className="mb-2">
              Status:{" "}
              <span className={exists ? "text-green-700" : "text-red-700"}>
                {exists ? "Active" : "Missing"}
              </span>
            </p>
            {!exists && (
              <button
                onClick={() => handleActivate(name)}
                disabled={activating === name || isLoading}
                className="standard-btn disabled:opacity-50"
              >
                {activating === name ? "Activating..." : "Activate"}
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}
