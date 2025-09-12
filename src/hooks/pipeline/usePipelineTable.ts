"use client";

import { useEffect, useState } from "react";
import { api, type RouterOutputs } from "@/trpc/react";

type Pipeline = RouterOutputs["crm"]["pipelines"]["grabAll"][number];

export function usePipelineTable() {
  const { data, isLoading, error, refetch } =
    api.crm.pipelines.grabAll.useQuery();

  const [pipelines, setPipelines] = useState<Pipeline[]>([]);

  useEffect(() => {
    if (data) {
      setPipelines(data);
    }
  }, [data]);

  return { pipelines, isLoading, error, refetch };
}
