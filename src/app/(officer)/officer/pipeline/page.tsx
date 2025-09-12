"use client";

import { PipelineHeader } from "@/features/officer/pipeline/header";
import { PipelineTable } from "@/features/officer/pipeline/pipeline-table";

const PipelinePage = () => {
  return (
    <div className="info-page">
      <PipelineHeader />
      <PipelineTable />
    </div>
  );
};

export default PipelinePage;
