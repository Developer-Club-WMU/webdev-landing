"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/trpc/react";
import PipelineCreationModal, {
  type PipelineCreationData,
} from "@/features/shared/Modal/PipelineCreation/PipelineCreationModal";

/**
 * Defines a header that sits on top of the pipeline table.
 * Can add a new pipeline
 */
export const PipelineHeader = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const utils = api.useUtils();

  // Creates a new pipeline and persists it on the database
  const createPipeline = api.crm.pipelines.create.useMutation();

  // Async function that handles pipeline creation
  const handleCreatePipeline = async (data: PipelineCreationData) => {
    await createPipeline.mutateAsync(data, {
      onSuccess: (createdPipeline) => {
        // Invalidate and refetch the pipeline list
        void utils.crm.pipelines.grabAll.invalidate();
        setIsModalOpen(false);
        // Navigate to the newly created pipeline
        router.push(`/officer/pipeline/${createdPipeline.id}`);
      },
      onError: (err) => {
        console.error(`Error: ${err.message}`);
      },
    });
  };

  return (
    <>
      <div className="flex flex-row justify-between">
        <div>
          <SimpleButton label={"New"} onClick={() => setIsModalOpen(true)} />
        </div>
        <div>
          <SimpleButton
            label={"Filter"}
            onClick={() => {
              console.log("temp");
            }}
          />
        </div>
      </div>

      <PipelineCreationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreatePipeline}
        isLoading={createPipeline.isPending}
      />
    </>
  );
};

/**
 * Defines a reusable button component
 */
const SimpleButton = ({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
}) => {
  return (
    <button
      className="text-text dark:text-text-inverted"
      onClick={() => onClick()}
    >
      {label}
    </button>
  );
};
