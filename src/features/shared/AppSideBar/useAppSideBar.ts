"use client";
import type { AppSideBarProtocol, UserRole } from "@/models";
import { internalSideBarManager } from "@/state/sidebar";
import type { Session } from "next-auth";

export class AppSideBarConfig implements AppSideBarProtocol {
  private titleValue: string;
  private readonly sidebarManager = internalSideBarManager;
  private readonly pathname: string;
  readonly accountType: UserRole = "officer";

  constructor(
    pathname: string,
    private session: Session | null
  ) {
    this.pathname = pathname;
    this.titleValue = this.resolveTitle(pathname);
  }

  private resolveTitle(pathname: string): string {
    if (pathname.includes("officer")) return `Officer ${this.getUser()}`;
    else return "Unknown user";
  }

  private getUser(): string {
    return this.session?.user.name ?? "No Data";
  }

  get title(): string {
    return this.titleValue;
  }

  clearOpenKey(): void {
    this.sidebarManager.setOpenKey("");
  }
}
