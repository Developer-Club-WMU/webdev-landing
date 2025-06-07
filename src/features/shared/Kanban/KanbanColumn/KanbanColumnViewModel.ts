import type {
  KanbanColumnHeader,
  LeadStatus,
  PipelineCellProps,
} from "@/models";

export class KanbanColumnViewModel {
  readonly stage: LeadStatus;
  readonly header: KanbanColumnHeader;
  private deals: PipelineCellProps[];

  constructor(
    stage: LeadStatus,
    header: KanbanColumnHeader,
    deals: PipelineCellProps[],
  ) {
    this.stage = stage;
    this.header = {
      ...header,
      totalItems: deals.filter(
        (deal: PipelineCellProps) => deal.status === stage,
      ).length,
    };
    this.deals = deals;
  }

  get filteredDeals(): PipelineCellProps[] {
    return this.deals.filter((deal) => deal.status === this.stage);
  }

  moveDeal(dealId: string, newStage: LeadStatus) {
    const deal = this.deals.find((d) => d.ID === dealId);
    if (deal) deal.status = newStage;
  }
}
