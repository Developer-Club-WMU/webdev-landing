"use client";

import KanbanColumn from "../../KanbanColumn/KanbanColumn";
import type { KanbanColumnViewModel } from "../../KanbanColumn/KanbanColumnViewModel";
import KanbanHeader from "../../KanbanHeader/KanbanHeader";
import { usePipelineContainerViewModel } from "./PipelineViewModel";
import { useState } from "react";
import { api } from "@/trpc/react";

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
  
  const [showAddSegmentForm, setShowAddSegmentForm] = useState(false);
  const [newSegmentName, setNewSegmentName] = useState("");
  const [insertPosition, setInsertPosition] = useState<number | undefined>(undefined);
  const [isCreating, setIsCreating] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const utils = api.useUtils();

  const createSegment = api.pipelineSegment.create.useMutation({
    onSuccess: async () => {
      setShowAddSegmentForm(false);
      setNewSegmentName("");
      setInsertPosition(undefined);
      setIsCreating(false);
      setShowSuccessMessage(true);
      
      // Hide success message after 3 seconds
      setTimeout(() => setShowSuccessMessage(false), 3000);
      
      if (pipelineId) {
        await utils.crm.pipelines.getById.invalidate({ id: pipelineId });
        await utils.crm.leads.getByPipelineId.invalidate({ pipelineId });
      }
    },
    onError: (error) => {
      setIsCreating(false);
      console.error("Failed to create segment:", error.message);
      
      // Show user-friendly error message
      const errorMessage = error.message.includes("name")
        ? "Column name already exists or is invalid"
        : "Failed to create column. Please try again.";
      
      alert(errorMessage);
    },
  });

  const handleCreateSegment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSegmentName.trim() || !pipelineId) return;

    setIsCreating(true);
    createSegment.mutate({
      pipelineId,
      name: newSegmentName.trim(),
      position: insertPosition,
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setShowAddSegmentForm(false);
      setNewSegmentName("");
      setInsertPosition(undefined);
    }
  };

  const AddSegmentForm = () => (
    <div className="flex w-80 min-w-[300px] flex-col gap-4 rounded-lg border border-dashed border-blue-400 p-4 dark:border-blue-500 bg-blue-50 dark:bg-blue-900/10" onKeyDown={handleKeyDown}>
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-blue-700 dark:text-blue-300">✨ New Column</span>
      </div>
      <form onSubmit={handleCreateSegment} className="flex flex-col gap-3">
        <input
          type="text"
          placeholder="Enter segment name (ESC to cancel)"
          value={newSegmentName}
          onChange={(e) => setNewSegmentName(e.target.value)}
          className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          disabled={isCreating}
          autoFocus
        />
        <select
          value={insertPosition ?? ""}
          onChange={(e) => setInsertPosition(e.target.value ? Number(e.target.value) : undefined)}
          className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          disabled={isCreating}
        >
          <option value="">Add at end</option>
          {columnViewModels.map((_, index) => (
            <option key={index} value={index}>
              Insert at position {index + 1}
            </option>
          ))}
        </select>
        <div className="flex gap-2">
          <button
            type="submit"
            disabled={!newSegmentName.trim() || isCreating}
            className="flex-1 rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isCreating ? "🔄 Creating..." : "➕ Create Column"}
          </button>
          <button
            type="button"
            onClick={() => {
              setShowAddSegmentForm(false);
              setNewSegmentName("");
              setInsertPosition(undefined);
            }}
            disabled={isCreating}
            className="flex-1 rounded-md bg-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-400 dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500 disabled:opacity-50 transition-colors"
          >
            ✕ Cancel
          </button>
        </div>
      </form>
    </div>
  );

  const AddSegmentButton = () => (
    <div className="flex w-80 min-w-[300px] items-center justify-center rounded-lg border border-dashed border-gray-400 p-8 dark:border-gray-500 hover:border-blue-400 dark:hover:border-blue-500 transition-colors">
      <button
        onClick={() => setShowAddSegmentForm(true)}
        className="flex flex-col items-center gap-2 rounded-md px-6 py-4 text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 transition-colors"
      >
        <div className="text-3xl text-gray-400 dark:text-gray-500">+</div>
        <span className="text-sm font-medium">Add New Column</span>
        <span className="text-xs text-gray-500 dark:text-gray-400">Expand your pipeline</span>
      </button>
    </div>
  );

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <KanbanHeader
          title={pipelineId ? "Pipeline Details" : "Pipeline (Reference)"}
        />
        {showSuccessMessage && (
          <div className="flex items-center gap-2 bg-green-100 text-green-700 px-3 py-2 rounded-md text-sm animate-pulse dark:bg-green-900/20 dark:text-green-400">
            <span>✅</span>
            <span>Column created successfully!</span>
          </div>
        )}
      </div>
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
        {pipelineId && (
          showAddSegmentForm ? <AddSegmentForm /> : <AddSegmentButton />
        )}
      </div>
    </div>
  );
};

export default PipelineContainer;
