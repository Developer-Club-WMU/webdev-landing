import { api, type RouterOutputs } from "@/trpc/react";
import { type CommunityName } from "@prisma/client";
import { useEffect, useState } from "react";

type Question = RouterOutputs["communityForms"]["grabAll"][number];

export function useJoinCommunityFormTable(name: CommunityName) {
  const { data, isLoading, error, refetch } =
    api.communityForms.findByCommunityName.useQuery({ name: name });

  const [forms, setForms] = useState<Question[]>([]);

  useEffect(() => {
    if (data) {
      setForms(data);
    }
  }, [data]);

  return { joinCommunityFormData: forms, isLoading, error, refetch };
}
