"use client";

import KanbanColumn from "../../KanbanColumn/KanbanColumn";
import type { KanbanColumnViewModel } from "../../KanbanColumn/KanbanColumnViewModel";
import KanbanHeader from "../../KanbanHeader/KanbanHeader";
import { usePipelineContainerViewModel } from "./PipelineViewModel";

/**
 * Defines a component that is used to render the current standard pipeline.
 * This component is specific for this task. Dynamic behavior should be created
 * as a standalone component designed to be dynamic based on configuartion data.
 */
const PipelineContainer = () => {
  const { viewModels: columnViewModels, onCardDrop } =
    usePipelineContainerViewModel();

  return (
    <div className="flex flex-col gap-4">
      <KanbanHeader title={"Pipeline"} />
      <div className="no-scrollbar dark:bg-github-lbg flex h-1/2 w-full flex-row gap-4 overflow-x-auto rounded-2xl border border-gray-300 bg-white p-6 shadow-sm dark:border-gray-600">
        {columnViewModels.map((column: KanbanColumnViewModel) => (
          <KanbanColumn
            key={column.stage}
            viewModel={column}
            onCardDrop={onCardDrop}
            header={column.header}
          />
        ))}
      </div>
    </div>
  );
};

export default PipelineContainer;
