"use client";

import KanbanColumn from "../../KanbanColumn/KanbanColumn";
import type { KanbanColumnViewModel } from "../../KanbanColumn/KanbanColumnViewModel";
import KanbanHeader from "../../KanbanHeader/KanbanHeader";
import { usePipelineContainerViewModel } from "./PipelineViewModel";

interface PipelineContainerProps {
  pipelineId?: string;
}

/**
 * Defines a component that is used to render the current standard pipeline.
 * This component is specific for this task. Dynamic behavior should be created
 * as a standalone component designed to be dynamic based on configuartion data.
 */
const PipelineContainer = ({ pipelineId }: PipelineContainerProps) => {
  const { viewModels: columnViewModels, onCardDrop } =
    usePipelineContainerViewModel(pipelineId);

  return (
    <div className="flex flex-col gap-4">
      <KanbanHeader
        title={pipelineId ? "Pipeline Details" : "Pipeline (Reference)"}
      />
      <div className="no-scrollbar dark:bg-github-lbg flex h-1/2 w-full flex-row gap-4 overflow-x-auto rounded-2xl border border-gray-300 bg-white p-6 shadow-sm dark:border-gray-600">
        {columnViewModels.map((column: KanbanColumnViewModel, index: number) => (
          <KanbanColumn
            key={column.stage}
            viewModel={column}
            onCardDrop={onCardDrop}
            header={column.header}
            pipelineId={pipelineId}
            segmentId={column.segmentId}
            columnIndex={index}
            totalColumns={columnViewModels.length}
            isFirstColumn={index === 0}
            isLastColumn={index === columnViewModels.length - 1}
          />
        ))}
      </div>
    </div>
  );
};

export default PipelineContainer;
