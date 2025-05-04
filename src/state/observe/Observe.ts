import type { DataObserver, EventID } from "@/models";

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
