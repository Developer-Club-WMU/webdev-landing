import { useState } from "react";
import {
  pipelineDeals,
  pipelineStages,
} from "@/app/(officer)/officer/pipeline/pipeline.config";
import { KanbanColumnViewModel } from "@/features/shared/Kanban/KanbanColumn/KanbanColumnViewModel";
import type { PipelineCellProps, LeadStatus } from "@/models";

/**
 * Hook to manage pipeline kanban container logic
 */
export function usePipelineContainerViewModel() {
  const [deals, setDeals] = useState<PipelineCellProps[]>(pipelineDeals);

  const onCardDrop = (dealId: string, newStage: LeadStatus) => {
    setDeals((prev: PipelineCellProps[]) =>
      prev.map((deal) =>
        deal.ID === dealId ? { ...deal, status: newStage } : deal,
      ),
    );
  };

  // Creates an array of column view models using stage info
  const viewModels: KanbanColumnViewModel[] = pipelineStages.map((stage) => {
    const filteredDeals = deals.filter((deal) => deal.status === stage.status);
    const header = {
      ...stage.header,
      totalItems: filteredDeals.length,
    };
    return new KanbanColumnViewModel(stage.status, header, deals);
  });

  return {
    viewModels,
    onCardDrop,
  };
}
