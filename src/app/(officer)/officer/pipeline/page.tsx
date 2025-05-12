"use client";
import { useState } from "react";
import KanbanColumn from "@/features/shared/Kanban/KanbanColumn/KanbanColumn";
import { KanbanColumnViewModel } from "@/features/shared/Kanban/KanbanColumn/KanbanColumnViewModel";
import { pipelineStages, pipelineDeals } from "./pipeline.config";
import type { LeadStatus, PipelineCellProps } from "@/models";

const PipelinePage = () => {
  const [deals, setDeals] = useState<PipelineCellProps[]>(pipelineDeals);

  const handleMove = (dealId: string, newStage: LeadStatus) => {
    setDeals((prev: PipelineCellProps[]) =>
      prev.map((deal) =>
        deal.ID === dealId ? { ...deal, status: newStage } : deal,
      ),
    );
  };

  return (
    <div className="info-page">
      <div className="w-full">
        <div className="no-scrollbar flex w-full flex-row gap-4 overflow-x-auto">
          {pipelineStages.map((stage) => {
            const vm = new KanbanColumnViewModel(
              stage.status,
              stage.title,
              deals,
            );

            return (
              <KanbanColumn
                key={stage.status}
                viewModel={vm}
                onCardDrop={handleMove}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PipelinePage;
