"use client";

import type { KanbanColumnHeader, KanbanColumnProps } from "@/models";
import { useEffect, useState, useRef } from "react";
import LeadForm from "../../Forms/LeadInfoForm/LeadInfoForm";
import LeadInfoCapture from "../../Modal/LeadInfoCapture/LeadInfoCapture";
import PipelineCell from "../KanbanCell/PipelineCell";
import { api } from "@/trpc/react";

interface KanbanColumnPropsExtended extends KanbanColumnProps {
  pipelineId?: string;
  segmentId?: string; // expect string to match router input
  columnIndex?: number;
  totalColumns?: number;
  isFirstColumn?: boolean;
  isLastColumn?: boolean;
}

const KanbanColumn = ({
  viewModel,
  onCardDrop,
  header,
  pipelineId,
  segmentId,
  columnIndex: _columnIndex,
  totalColumns: _totalColumns,
  isFirstColumn,
  isLastColumn,
}: KanbanColumnPropsExtended) => {
  const handleDrop = (e: React.DragEvent) => {
    const dealId = e.dataTransfer.getData("text");
    if (dealId && onCardDrop) {
      onCardDrop(dealId, viewModel.stage);
      viewModel.moveDeal(dealId, viewModel.stage);
    }
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      className="border-border-muted bg-bg dark:bg-github-muted flex w-80 min-w-[300px] flex-col gap-4 rounded-lg border p-4 shadow-sm dark:border-gray-500"
    >
      <ColumnHeader
        config={{ ...header, isFirstColumn, isLastColumn }}
        pipelineId={pipelineId}
        segmentId={segmentId}
        segmentName={viewModel.stage}

      />

      {viewModel.filteredDeals.map((deal) => (
        <PipelineCell key={deal.ID} {...deal} />
      ))}
    </div>
  );
};

export default KanbanColumn;

/* ---------------- Header with editable title ---------------- */

const ColumnHeader = ({
  config,
  pipelineId,
  segmentId,
  segmentName,
}: {
  config: KanbanColumnHeader & { isFirstColumn?: boolean; isLastColumn?: boolean };
  pipelineId?: string;
  segmentId?: string;
  segmentName?: string;
}) => {
  const leadCount = config.totalItems;
  const [isLeadFormOpen, setLeadFormOpenState] = useState(false);
  const [showDeleteMenu, setShowDeleteMenu] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // editable title state
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(config.title);

  useEffect(() => {
    if (!editing) setDraft(config.title);
  }, [config.title, editing]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowDeleteMenu(false);
        setConfirmDelete(null);
      }
    };

    if (showDeleteMenu) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [showDeleteMenu]);

  // Auto-reset confirmation state after 3 seconds
  useEffect(() => {
    if (confirmDelete) {
      const timer = setTimeout(() => {
        setConfirmDelete(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [confirmDelete]);

  // tRPC mutations
  const utils = api.useUtils();
  const updateSegment = api.pipelineSegment.update.useMutation({
    onSuccess: async () => {
      await utils.invalidate(); // refresh any dependent queries
    },
  });

  const deleteSegment = api.pipelineSegment.delete.useMutation({
    onSuccess: async (result) => {
      setIsDeleting(false);
      setShowDeleteMenu(false);
      setConfirmDelete(null);
      
      // Success feedback
      console.log("✅ Column deleted successfully");
      if (result.transferredTo) {
        console.log("📋 Leads transferred to another column");
      }
      
      if (pipelineId) {
        await utils.crm.pipelines.getById.invalidate({ id: pipelineId });
        await utils.crm.leads.getByPipelineId.invalidate({ pipelineId });
      }
    },
    onError: (error) => {
      setIsDeleting(false);
      setConfirmDelete(null);
      console.error("❌ Failed to delete column:", error.message);
      
      // Show user-friendly error message based on error type
      const errorMessage = error.message.includes("No previous segment")
        ? "Cannot transfer to previous: This is the first column"
        : error.message.includes("No next segment")
        ? "Cannot transfer to next: This is the last column"
        : "Failed to delete column. Please try again.";
        
      // In a real app, you'd show this in a toast notification
      alert(errorMessage);
    },
  });

  const saveTitle = () => {
    const next = draft.trim();
    if (!segmentId) {
      setEditing(false);
      setDraft(config.title);
      return;
    }
    if (!next || next === config.title) {
      setEditing(false);
      setDraft(config.title);
      return;
    }
    updateSegment.mutate({ segmentId, name: next });
    setEditing(false);
  };

  const handleDelete = (transferOption: "delete_all" | "transfer_previous" | "transfer_next") => {
    if (!segmentId || !pipelineId) return;
    
    // For destructive delete, require confirmation
    if (transferOption === "delete_all" && confirmDelete !== "delete_all") {
      setConfirmDelete("delete_all");
      return;
    }
    
    setIsDeleting(true);
    setConfirmDelete(null);
    deleteSegment.mutate({
      segmentId,
      pipelineId,
      transferOption,
    });
  };

  return (
    <div className="bg-bg-subtle flex flex-row items-center justify-between rounded-xl shadow-sm">
      {/* Left: stage title button / editor */}
      <div className="flex items-center gap-2">
        {!editing ? (
          <button
            onClick={config.control.onClick}
            className="text-text rounded-lg px-4 py-2 text-base font-semibold shadow-sm transition hover:opacity-90"
            style={{ backgroundColor: config.color }}
            title="Stage actions"
          >
            {config.title}
          </button>
        ) : (
          <input
            autoFocus
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") saveTitle();
              if (e.key === "Escape") {
                setDraft(config.title);
                setEditing(false);
              }
            }}
            className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500
                       dark:border-white/10 dark:bg-neutral-900 dark:text-gray-100"
            placeholder="Stage name"
          />
        )}

        {!editing ? (
          <button
            onClick={() => setEditing(true)}
            className="rounded-md border border-gray-300 px-2 py-1 text-sm text-gray-700 hover:bg-gray-100
                       dark:border-white/10 dark:text-gray-200 dark:hover:bg-white/5"
            aria-label="Edit stage name"
          >
            Edit
          </button>
        ) : (
          <>
            <button
              onClick={saveTitle}
              disabled={updateSegment.isPending}
              className="rounded-md bg-blue-600 px-3 py-1.5 text-sm text-white hover:bg-blue-700 disabled:opacity-50
                         dark:bg-blue-500 dark:hover:bg-blue-600"
            >
              {updateSegment.isPending ? "Saving…" : "Save"}
            </button>
            <button
              onClick={() => {
                setDraft(config.title);
                setEditing(false);
              }}
              disabled={updateSegment.isPending}
              className="rounded-md border border-gray-300 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100
                         dark:border-white/10 dark:text-gray-200 dark:hover:bg-white/5"
            >
              Cancel
            </button>
          </>
        )}
      </div>

      {/* Right: actions */}
      <div className="flex flex-row items-center gap-2">
        <button
          onClick={() => setLeadFormOpenState(true)}
          className="text-text dark:bg-github-lbg dark:text-text-inverted hover:bg-bg-muted/80 rounded-lg px-3 py-2 text-xl transition"
          aria-label="Add new item"
        >
          +
        </button>
        {!editing && (
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setShowDeleteMenu(!showDeleteMenu)}
              className="text-text dark:bg-github-lbg dark:text-text-inverted hover:bg-bg-muted/80 rounded-lg px-3 py-2 text-xl transition"
              aria-label="More options"
              disabled={isDeleting}
            >
              {isDeleting ? "⏳" : "…"}
            </button>

            {showDeleteMenu && (
              <div className="absolute right-0 top-full mt-1 w-56 rounded-md border border-gray-300 bg-white shadow-lg dark:border-white/10 dark:bg-neutral-800 z-50">
                <div className="py-1">
                  <div className="px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 border-b border-gray-200 dark:border-white/10">
                    Delete Column
                  </div>
                  
                  <button
                    onClick={() => handleDelete("delete_all")}
                    disabled={isDeleting}
                    className={`w-full px-3 py-2 text-left text-sm transition-colors ${
                      confirmDelete === "delete_all"
                        ? "bg-red-600 text-white dark:bg-red-700 animate-pulse"
                        : "text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
                    } disabled:opacity-50`}
                  >
                    <div className="font-medium">
                      {confirmDelete === "delete_all" ? "Click again to confirm" : "Delete with all data"}
                    </div>
                    <div className={`text-xs ${confirmDelete === "delete_all" ? "text-red-200 dark:text-red-300" : "text-gray-500 dark:text-gray-400"}`}>
                      {confirmDelete === "delete_all"
                        ? `⚠️ This will permanently delete ${leadCount} lead${leadCount !== 1 ? 's' : ''}!`
                        : `Permanently removes ${leadCount} lead${leadCount !== 1 ? 's' : ''} in this column`}
                    </div>
                  </button>

                  <button
                    onClick={() => handleDelete("transfer_previous")}
                    disabled={isDeleting || config.isFirstColumn}
                    className={`w-full px-3 py-2 text-left text-sm ${
                      config.isFirstColumn
                        ? "text-gray-400 dark:text-gray-500 cursor-not-allowed"
                        : "text-gray-700 hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-white/5"
                    } disabled:opacity-50`}
                  >
                    <div className="font-medium">Delete & transfer to previous</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {config.isFirstColumn 
                        ? "No previous column available" 
                        : `Moves ${leadCount} lead${leadCount !== 1 ? 's' : ''} to the previous column`}
                    </div>
                  </button>

                  <button
                    onClick={() => handleDelete("transfer_next")}
                    disabled={isDeleting || config.isLastColumn}
                    className={`w-full px-3 py-2 text-left text-sm ${
                      config.isLastColumn
                        ? "text-gray-400 dark:text-gray-500 cursor-not-allowed"
                        : "text-gray-700 hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-white/5"
                    } disabled:opacity-50`}
                  >
                    <div className="font-medium">Delete & transfer to next</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {config.isLastColumn 
                        ? "No next column available" 
                        : `Moves ${leadCount} lead${leadCount !== 1 ? 's' : ''} to the next column`}
                    </div>
                  </button>

                  <div className="border-t border-gray-200 dark:border-white/10 mt-1">
                    <button
                      onClick={() => {
                        setShowDeleteMenu(false);
                        setConfirmDelete(null);
                      }}
                      className="w-full px-3 py-2 text-left text-sm text-gray-500 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-white/5"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <LeadInfoCapture
        isOpen={isLeadFormOpen}
        onClose={() => setLeadFormOpenState(false)}
      >
        <LeadForm
          initialValues={{}}
          onSubmit={() => setLeadFormOpenState(false)}
          pipelineId={pipelineId}
          // segmentId is now string to match router input
          segmentId={segmentId}
          segmentName={segmentName}
        />
      </LeadInfoCapture>
    </div>
  );
};
