import { EventBus } from "./EventBus";

const MARKETING_EVENTS = ["addCampaign", "deleteCampaign"] as const;

const marketingEventBus = new EventBus(MARKETING_EVENTS);

marketingEventBus.subscribe.onAddCampaign(() => {
  console.log("");
});

export class MarketingEventBus {
  private listeners: (() => void)[] = [];

  constructor() {
    console.log("temp");
  }

  subscribe(callback: () => void) {
    if (typeof callback === "function") {
      this.listeners.push(callback);
    }
  }

  emit(): void {
    for (const cb of this.listeners) {
      cb();
    }
  }
}
