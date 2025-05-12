import type { PipelineCellProps, LeadStatus } from "@/models";

export class KanbanColumnViewModel {
  readonly stage: LeadStatus;
  readonly title: string;
  private deals: PipelineCellProps[];

  constructor(stage: LeadStatus, title: string, deals: PipelineCellProps[]) {
    this.stage = stage;
    this.title = title;
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
