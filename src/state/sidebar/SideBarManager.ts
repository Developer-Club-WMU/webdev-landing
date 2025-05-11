import type { SideBarProtocol, SidebarListener } from "@/models";

/**
 * A manager class for coordinating sidebar link open states.
 *
 * This class follows the SideBarProtocol interface, allowing components
 * to subscribe to changes in the currently active (open) sidebar link,
 * ensuring that only one top-level sidebar link is open at a time.
 *
 * Useful for controlling UI behavior such as collapsible sidebar sections.
 */
export class SideBarManager implements SideBarProtocol {
  /**
   * The currently open key (typically a section title).
   * An empty string indicates that no section is open.
   */
  private openKey = "";

  /**
   * A set of listener functions that will be notified
   * whenever the openKey is updated.
   */
  private listeners = new Set<SidebarListener>();

  /**
   * Subscribes a listener to openKey updates.
   *
   * @param listener - A function that receives the new openKey value when it changes.
   */
  subscribe(listener: SidebarListener): void {
    this.listeners.add(listener);
  }

  /**
   * Unsubscribes a listener from receiving openKey updates.
   *
   * @param listener - The listener function to remove from the subscription set.
   */
  unsubscribe(listener: SidebarListener): void {
    this.listeners.delete(listener);
  }

  /**
   * Returns the currently active open key.
   *
   * @returns The string value of the current openKey.
   */
  getOpenKey(): string {
    return this.openKey;
  }

  /**
   * Sets the currently active open key and notifies all subscribers.
   * If the key is the same as the existing one, no action is taken.
   *
   * @param key - The new open key to set. Use an empty string to close all sections.
   */
  setOpenKey(key: string): void {
    if (this.openKey === key) return;

    this.openKey = key;

    for (const listener of this.listeners) {
      listener(this.openKey);
    }
  }
}
