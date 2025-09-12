import {
  pipelineDeals,
  pipelineStages,
} from "@/app/(officer)/officer/pipeline/pipeline.config";
import { KanbanColumnViewModel } from "@/features/shared/Kanban/KanbanColumn/KanbanColumnViewModel";
import type { LeadStatus, LeadType, PipelineCellProps } from "@/models";
import type { RouterOutputs } from "@/trpc/react";
import { api } from "@/trpc/react";
import { useEffect, useState } from "react";

type LeadFromDB = RouterOutputs["crm"]["leads"]["getByPipelineId"][number];

/**
 * Hook to manage pipeline kanban container logic
 */
export function usePipelineContainerViewModel(pipelineId?: string) {
  const [deals, setDeals] = useState<PipelineCellProps[]>(pipelineDeals);

  // Fetch real pipeline data if pipelineId is provided
  const {
    data: pipelineData,
    isLoading,
    error,
  } = api.crm.pipelines.getById.useQuery(
    { id: pipelineId! },
    {
      enabled: !!pipelineId,
    }
  );

  // Fetch leads for the specific pipeline
  const {
    data: leadsData,
    isLoading: leadsLoading,
    error: leadsError,
  } = api.crm.leads.getByPipelineId.useQuery(
    { pipelineId: pipelineId! },
    {
      enabled: !!pipelineId,
    }
  );

  // Update deals when real pipeline data is available
  useEffect(() => {
    if (pipelineData && pipelineId && leadsData) {
      // Convert database leads to PipelineCellProps format
      const convertedDeals: PipelineCellProps[] = leadsData.map(
        (lead: LeadFromDB) => ({
          ID: lead.id,
          title: lead.title,
          description: lead.description ?? "",
          capital: lead.capitalValue
            ? `$${lead.capitalValue.toLocaleString()}`
            : "$0",
          leadName: lead.contactName,
          companyName: lead.companyName,
          avatarURL: lead.avatarURL ?? "",
          addedOn: lead.addedOn,
          dueDate: lead.dueDate ?? lead.addedOn,
          status: lead.status as LeadStatus,
          leadType: lead.leadType as LeadType,
          isDragging: false,
          leadInfo: {
            id: lead.id,
            title: lead.title,
            description: lead.description ?? "",
            capitalValue: lead.capitalValue ?? 0,
            contactName: lead.contactName,
            companyName: lead.companyName,
            avatarURL: lead.avatarURL ?? undefined,
            addedOn: lead.addedOn.toISOString(),
            dueDate: lead.dueDate?.toISOString() ?? lead.addedOn.toISOString(),
            status: lead.status as LeadStatus,
            leadType: lead.leadType as LeadType,
            pipelineStage: lead.pipelineStage ?? undefined,
            segmentId: lead.segmentId ?? undefined,
            isArchived: lead.isArchived,
            source: lead.source ?? undefined,
            tags: lead.tags,
            ownerID: lead.createdById,
          },
        })
      );
      setDeals(convertedDeals);
    } else {
      // Use reference data when no pipelineId
      setDeals(pipelineDeals);
    }
  }, [pipelineData, pipelineId, leadsData]);

  const onCardDrop = (dealId: string, newStage: LeadStatus) => {
    // Update local state immediately for UI responsiveness
    setDeals((prev: PipelineCellProps[]) =>
      prev.map((deal) =>
        deal.ID === dealId ? { ...deal, status: newStage } : deal
      )
    );

    // If we have pipeline data, find the target segment and update in database
    if (pipelineData && pipelineId) {
      const targetSegment = pipelineData.segments.find(
        (segment) => segment.name === newStage
      );

      if (targetSegment) {
        moveLead.mutate({
          leadId: dealId,
          segmentId: targetSegment.id,
          status: newStage,
        });
      }
    }
  };

  // Move lead mutation for drag-and-drop
  const moveLead = api.crm.leads.moveToSegment.useMutation({
    onError: (error) => {
      console.error("Failed to move lead:", error.message);
      // Revert the optimistic update on error
      if (leadsData) {
        const originalDeals: PipelineCellProps[] = leadsData.map(
          (lead: LeadFromDB) => ({
            ID: lead.id,
            title: lead.title,
            description: lead.description ?? "",
            capital: lead.capitalValue
              ? `$${lead.capitalValue.toLocaleString()}`
              : "$0",
            leadName: lead.contactName,
            companyName: lead.companyName,
            avatarURL: lead.avatarURL ?? undefined,
            addedOn: lead.addedOn,
            dueDate: lead.dueDate ?? lead.addedOn,
            status: lead.status as LeadStatus,
            leadType: lead.leadType as LeadType,
            isDragging: false,
            leadInfo: {
              id: lead.id,
              title: lead.title,
              description: lead.description ?? "",
              capitalValue: lead.capitalValue ?? 0,
              contactName: lead.contactName,
              companyName: lead.companyName,
              avatarURL: lead.avatarURL ?? undefined,
              addedOn: lead.addedOn.toISOString(),
              dueDate:
                lead.dueDate?.toISOString() ?? lead.addedOn.toISOString(),
              status: lead.status as LeadStatus,
              leadType: lead.leadType as LeadType,
              pipelineStage: lead.pipelineStage ?? undefined,
              segmentId: lead.segmentId ?? undefined,
              isArchived: lead.isArchived,
              source: lead.source ?? undefined,
              tags: lead.tags,
              ownerID: lead.createdById,
            },
          })
        );
        setDeals(originalDeals);
      }
    },
    onSuccess: () => {
      // Refresh the leads data to ensure consistency
      if (pipelineId) {
        void utils.crm.leads.getByPipelineId.invalidate({ pipelineId });
      }
    },
  });

  const utils = api.useUtils();

  // Creates an array of column view models using stage info or real segments
  const viewModels: KanbanColumnViewModel[] =
    pipelineId && pipelineData?.segments
      ? pipelineData.segments.map((segment) => {
          const filteredDeals = deals.filter(
            (deal) => deal.leadInfo?.segmentId === segment.id
          );
          const header = {
            title: segment.name,
            totalItems: filteredDeals.length,
            control: {
              onClick: () => {
                // No action for segment header
              },
              icon: "📋",
            },
            color: "#E0F2FE",
          };
          return new KanbanColumnViewModel(
            segment.name as LeadStatus,
            header,
            deals,
            segment.id
          );
        })
      : pipelineStages.map((stage) => {
          const filteredDeals = deals.filter(
            (deal) => deal.status === stage.status
          );
          const header = {
            ...stage.header,
            totalItems: filteredDeals.length,
          };
          return new KanbanColumnViewModel(
            stage.status,
            header,
            deals,
            undefined
          );
        });

  return {
    viewModels,
    onCardDrop,
    isLoading: isLoading || leadsLoading,
    error: error ?? leadsError,
  };
}
