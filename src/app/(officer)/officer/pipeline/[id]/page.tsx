"use client";

import { useParams } from "next/navigation";
import { api } from "@/trpc/react";
import { PipelineHeader } from "@/features/officer/pipeline/header";
import PipelineContainer from "@/features/shared/Kanban/KanbanContainer/PipelineContainer/PipelineContainer";

const IndividualPipelinePage = () => {
  const params = useParams();
  const pipelineId = params.id as string;

  const {
    data: pipeline,
    isLoading,
    error,
  } = api.crm.pipelines.getById.useQuery(
    { id: pipelineId },
    {
      enabled: !!pipelineId,
    },
  );

  if (isLoading) {
    return (
      <div className="info-page">
        <div className="flex items-center justify-center p-8">
          <div className="text-text dark:text-text-inverted">
            Loading pipeline...
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="info-page">
        <div className="flex items-center justify-center p-8">
          <div className="text-error">
            Error loading pipeline: {error.message}
          </div>
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
        <h1 className="text-2xl font-bold text-text dark:text-text-inverted">
          {pipeline.name}
        </h1>
        <p className="text-text-muted text-sm">
          Created by {pipeline.createdBy.name} on{" "}
          {new Date(pipeline.createdAt).toLocaleDateString()}
        </p>
      </div>

      <PipelineHeader />
      <PipelineContainer pipelineId={pipelineId} />
    </div>
  );
};

export default IndividualPipelinePage;
