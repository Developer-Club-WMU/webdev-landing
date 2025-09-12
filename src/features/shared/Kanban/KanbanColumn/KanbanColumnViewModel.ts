import type {
  KanbanColumnHeader,
  LeadStatus,
  PipelineCellProps,
} from "@/models";

export class KanbanColumnViewModel {
  readonly stage: LeadStatus;
  readonly header: KanbanColumnHeader;
  readonly segmentId?: string;
  private deals: PipelineCellProps[];

  constructor(
    stage: LeadStatus,
    header: KanbanColumnHeader,
    deals: PipelineCellProps[],
    segmentId?: string
  ) {
    this.stage = stage;
    this.segmentId = segmentId;
    this.header = {
      ...header,
      totalItems: this.segmentId
        ? deals.filter(
            (deal: PipelineCellProps) =>
              deal.leadInfo?.segmentId === this.segmentId
          ).length
        : deals.filter((deal: PipelineCellProps) => deal.status === stage)
            .length,
    };
    this.deals = deals;
  }

  get filteredDeals(): PipelineCellProps[] {
    return this.segmentId
      ? this.deals.filter((deal) => deal.leadInfo?.segmentId === this.segmentId)
      : this.deals.filter((deal) => deal.status === this.stage);
  }

  moveDeal(dealId: string, newStage: LeadStatus) {
    const deal = this.deals.find((d) => d.ID === dealId);
    if (deal) deal.status = newStage;
  }
}
