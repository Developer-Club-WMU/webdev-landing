"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { api } from "@/trpc/react";
import PipelineContainer from "@/features/shared/Kanban/KanbanContainer/PipelineContainer/PipelineContainer";

const IndividualPipelinePage = () => {
  const params = useParams();
  const pipelineId = params.id as string;

  const utils = api.useUtils();

  const {
    data: pipeline,
    isLoading,
    error,
  } = api.crm.pipelines.getById.useQuery(
    { id: pipelineId },
    { enabled: !!pipelineId }
  );

  const updateName = api.crm.pipelines.update.useMutation({
    onSuccess: async () => {
      await utils.crm.pipelines.getById.invalidate({ id: pipelineId });
    },
  });

  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("");

  useEffect(() => {
    if (pipeline?.name) setName(pipeline.name);
  }, [pipeline?.name]);

  const submitName = () => {
    if (!pipeline) return;
    if (!name.trim() || name === pipeline.name) {
      setEditing(false);
      return;
    }
    updateName.mutate({ id: pipeline.id, name: name.trim() });
    setEditing(false);
  };

  if (isLoading) {
    return (
      <div className="info-page">
        <div className="flex items-center justify-center p-8">
          <div className="text-text dark:text-text-inverted">Loading pipeline...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="info-page">
        <div className="flex items-center justify-center p-8">
          <div className="text-error">Error loading pipeline: {error.message}</div>
        </div>
      </div>
    );
  }

  if (!pipeline) {
    return (
      <div className="info-page">
        <div className="flex items-center justify-center p-8">
          <div className="text-text-muted">Pipeline not found</div>
        </div>
      </div>
    );
  }

  return (
    <div className="info-page">
      <div className="mb-4">
        <div className="flex items-center gap-2">
          {editing ? (
            <div className="flex items-center gap-2">
              <input
                autoFocus
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") submitName();
                  if (e.key === "Escape") {
                    setName(pipeline.name);
                    setEditing(false);
                  }
                }}
                className="rounded-md border border-gray-300 bg-white px-3 py-2 text-xl font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500
                           dark:border-white/10 dark:bg-neutral-900 dark:text-gray-100 dark:focus:ring-blue-500"
              />
              <button
                onClick={submitName}
                disabled={updateName.isPending}
                className="rounded-md bg-blue-600 px-3 py-2 text-white hover:bg-blue-700 disabled:opacity-50
                           dark:bg-blue-500 dark:hover:bg-blue-600"
              >
                {updateName.isPending ? "Saving…" : "Save"}
              </button>
              <button
                onClick={() => {
                  setName(pipeline.name);
                  setEditing(false);
                }}
                className="rounded-md border border-gray-300 px-3 py-2 text-gray-700 hover:bg-gray-100
                           dark:border-white/10 dark:text-gray-200 dark:hover:bg-white/5"
              >
                Cancel
              </button>
            </div>
          ) : (
            <>
              <h1 className="text-2xl font-bold text-text dark:text-text-inverted">
                {pipeline.name}
              </h1>
              <button
                onClick={() => setEditing(true)}
                className="rounded-md border border-gray-300 px-2 py-1 text-sm text-gray-700 hover:bg-gray-100
                           dark:border-white/10 dark:text-gray-200 dark:hover:bg-white/5"
                aria-label="Edit pipeline name"
              >
                Edit
              </button>
            </>
          )}
        </div>

        <p className="text-text-muted text-sm">
          Created by {pipeline.createdBy.name} on{" "}
          {new Date(pipeline.createdAt).toLocaleDateString()}
        </p>

        {updateName.isError && (
          <p className="mt-2 text-sm text-red-600 dark:text-red-400">
            {updateName.error.message}
          </p>
        )}
      </div>

      {/*<PipelineHeader />*/}
      <PipelineContainer pipelineId={pipelineId} />
    </div>
  );
};

export default IndividualPipelinePage;
