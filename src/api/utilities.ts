import type { DataObserver, EventID, SidebarListener, SideBarProtocol } from "@/api/apis";

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


/**
 * A class that allows subscription to value changes.
 */
export class Observe<T> implements DataObserver<T> {
    private listeners = new Map<EventID, (value: T) => void>();

    constructor(private trackableValue: T) {}

    /**
     * Generates and returns a unique ID.
     * Can be improved using UUID v4 or crypto.randomUUID.
     */
    private generateID(): EventID {
        return Math.random().toString(36).substring(2, 10);
    }

    /**
     * Subscribes a listener to value changes.
     * @param listener - The callback function to invoke on value changes.
     * @returns A unique ID used to unsubscribe.
     */
    addChangeListener(listener: (value: T) => void): EventID {
        if (typeof listener !== "function") {
        throw new TypeError("Listener must be a function");
        }

        const id = this.generateID();
        this.listeners.set(id, listener);
        return id;
    }

    /**
     * Unsubscribes a listener using its ID.
     * @param ID - The listener's unique ID.
     */
    removeListener(ID: EventID): void {
        this.listeners.delete(ID);
    }

    /**
     * Updates the tracked value and notifies all listeners.
     */
    set value(newValue: T) {
        // Optionally avoid triggering if value didn't change:
        // if (Object.is(this.trackableValue, newValue)) return;

        this.trackableValue = newValue;
        for (const listener of this.listeners.values()) {
        listener(newValue);
        }
    }

    /**
     * Returns the current tracked value.
     */
    get value(): T {
        return this.trackableValue;
    }
}