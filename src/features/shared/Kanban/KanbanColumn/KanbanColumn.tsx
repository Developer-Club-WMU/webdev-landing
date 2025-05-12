"use client";

import PipelineCell from "../KanbanCell/PipelineCell";
import type { KanbanColumnViewModel } from "./KanbanColumnViewModel";
import type { LeadStatus } from "@/models";

interface KanbanColumnProps {
  viewModel: KanbanColumnViewModel;
  onCardDrop?: (dealId: string, newStage: LeadStatus) => void;
}

const KanbanColumn = ({ viewModel, onCardDrop }: KanbanColumnProps) => {
  const handleDrop = (e: React.DragEvent) => {
    const dealId = e.dataTransfer.getData("text");
    if (dealId && onCardDrop) {
      onCardDrop(dealId, viewModel.stage);
      viewModel.moveDeal(dealId, viewModel.stage);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      className="border-border-muted bg-bg dark:bg-bg-inverted flex w-80 min-w-[300px] flex-col gap-4 rounded-lg border p-4 shadow-sm"
    >
      <h2 className="text-text dark:text-text-inverted mb-2 text-lg font-bold">
        {viewModel.title} ({viewModel.filteredDeals.length})
      </h2>
      {viewModel.filteredDeals.map((deal) => (
        <PipelineCell key={deal.ID} {...deal} />
      ))}
    </div>
  );
};

export default KanbanColumn;
