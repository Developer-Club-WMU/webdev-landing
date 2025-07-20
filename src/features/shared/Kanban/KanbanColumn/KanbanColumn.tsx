"use client";

import type { KanbanColumnHeader, KanbanColumnProps } from "@/models";
import { useState } from "react";
import LeadForm from "../../Forms/LeadInfoForm/LeadInfoForm";
import LeadInfoCapture from "../../Modal/LeadInfoCapture/LeadInfoCapture";
import PipelineCell from "../KanbanCell/PipelineCell";

interface KanbanColumnPropsExtended extends KanbanColumnProps {
  pipelineId?: string;
  segmentId?: number;
}

const KanbanColumn = ({
  viewModel,
  onCardDrop,
  header,
  pipelineId,
  segmentId,
}: KanbanColumnPropsExtended) => {
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
      className="border-border-muted bg-bg dark:bg-github-muted flex w-80 min-w-[300px] flex-col gap-4 rounded-lg border p-4 shadow-sm dark:border-gray-500"
    >
      <div className="">
        {/* <h2 className="text-text dark:text-text-inverted mb-2 text-lg font-bold">
          {viewModel.title} ({viewModel.filteredDeals.length})
        </h2> */}
        <ColumnHeader
          config={header}
          pipelineId={pipelineId}
          segmentId={segmentId}
          segmentName={viewModel.stage}
        />
      </div>
      {viewModel.filteredDeals.map((deal) => (
        <PipelineCell key={deal.ID} {...deal} />
      ))}
    </div>
  );
};

export default KanbanColumn;

const ColumnHeader = ({
  config,
  pipelineId,
  segmentId,
  segmentName,
}: {
  config: KanbanColumnHeader;
  pipelineId?: string;
  segmentId?: number;
  segmentName?: string;
}) => {
  const [isLeadFormOpen, setLeadFormOpenState] = useState<boolean>(false);
  return (
    <div className="bg-bg-subtle flex flex-row items-center justify-between rounded-xl shadow-sm">
      <button
        onClick={config.control.onClick}
        className="text-text rounded-lg px-4 py-2 text-base font-semibold shadow-sm transition hover:opacity-90"
        style={{ backgroundColor: config.color }}
      >
        {config.title}
      </button>

      <div className="flex flex-row items-center gap-2">
        <button
          onClick={() => setLeadFormOpenState(true)}
          className="text-text dark:bg-github-lbg dark:text-text-inverted hover:bg-bg-muted/80 rounded-lg px-3 py-2 text-xl transition"
          aria-label="Add new item"
        >
          +
        </button>
        <button
          className="text-text dark:bg-github-lbg dark:text-text-inverted hover:bg-bg-muted/80 rounded-lg px-3 py-2 text-xl transition"
          aria-label="More options"
        >
          ...
        </button>
      </div>
      <LeadInfoCapture
        isOpen={isLeadFormOpen}
        onClose={() => setLeadFormOpenState(false)}
      >
        <LeadForm
          initialValues={{}}
          onSubmit={() => setLeadFormOpenState(false)}
          pipelineId={pipelineId}
          segmentId={segmentId}
          segmentName={segmentName}
        />
      </LeadInfoCapture>
    </div>
  );
};
