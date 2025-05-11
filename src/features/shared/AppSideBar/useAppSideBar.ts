import type { AppSideBarProtocol, UserRole } from "@/models";
import { internalSideBarManager } from "@/state/sidebar";

export class AppSideBarConfig implements AppSideBarProtocol {
  private titleValue: string;
  private emojiValue: string;
  private readonly sidebarManager = internalSideBarManager;
  private readonly pathname: string;
  readonly accountType: UserRole = "officer";

  constructor(pathname: string) {
    this.pathname = pathname;
    this.titleValue = this.resolveTitle(pathname);
    this.emojiValue = this.resolveEmoji(pathname);
  }

  private resolveTitle(pathname: string): string {
    if (pathname.includes("officer")) return `Officer ${this.getUser()}`;
    else return "Unknown user";
  }

  private resolveEmoji(pathname: string): string {
    if (pathname.includes("officer")) return "🧑‍💼";
    else return "❓";
  }

  private getUser(): string {
    return "Julio"; // Stubbed; should come from auth/session
  }

  get title(): string {
    return this.titleValue;
  }

  get emoji(): string {
    return this.emojiValue;
  }

  clearOpenKey(): void {
    this.sidebarManager.setOpenKey("");
  }
}
