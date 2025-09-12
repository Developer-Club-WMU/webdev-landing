/**
 * The EventBus is a lightweight event bus that lets you emit and subscribe to named events.
 *
 * Type parameter `Events` should be a readonly tuple of string literals (e.g. `['foo','bar'] as const`).
 *
 * @example
 * // Define events once:
 * const CHART_EVENTS = ['switchToTableView','switchToTreeView'] as const;
 *
 * // Couple it with its type
 * export type ChartOfAccountsEvents = typeof CHART_OF_ACCOUNTS_EVENTS;
 *
 * // Instantiate the event bus:
 * const bridge: EventBus<ChartOfAccountsEvents> = new EventBus(CHART_OF_ACCOUNTS_EVENTS);
 *
 * // Subscribe to an event (returns an unsubscribe function):
 * const offTable = bridge.subscribe.onSwitchToTableView(() => {
 *   console.log('switched to table view');
 * });
 *
 * // Emit the event:
 * bridge.emit.switchToTableView();
 *
 * // Unsubscribe:
 * offTable();
 *
 * // Clear callbacks for specific events:
 * bridge.clear("switchToTableView");
 *
 * // OR clear all callbacks
 * bridge.clear();
 */
export class EventBus<
  Events extends readonly string[],
  // EventArgs extends Record<Events[number], unknown[]>,
> {
  /**
   * Internal storage of subscriber callbacks per event.
   * Keys are event names, values are arrays of handler functions.
   */
  private callbacks: Partial<
    Record<Events[number], ((...args: unknown[]) => void)[]>
  > = {};

  /**
   * Emitter methods, one per event.
   * Call `bridge.emit.eventName(...args)` to invoke all subscribers of that event.
   */
  public readonly emit: Record<Events[number], (...args: unknown[]) => void>;

  /**
   * Subscription methods, one per event, named `onEventName`.
   * Each returns an unsubscribe function to remove the handler.
   */
  public readonly subscribe: Record<
    `on${Capitalize<Events[number]>}`,
    (cb: (...args: unknown[]) => void) => () => void
  >;

  /**
   * @param events - an array of event names (as const tuple) that this event bus will support
   */
  constructor(public readonly events: Events) {
    // e -> events  cb -> callback
    // Initialize emit and subscribe objects
    this.emit = {} as Record<Events[number], (...args: unknown[]) => void>;

    this.subscribe = {} as Record<
      `on${Capitalize<Events[number]>}`,
      (cb: (...args: unknown[]) => void) => () => void
    >;

    for (const e of events) {
      // For each event, initialize an array of callbacks
      this.callbacks[e as Events[number]] = [];

      // Create emitter: emit[e](...args)
      this.emit[e as Events[number]] = (...args: unknown[]) => {
        const eventCallbacks = this.callbacks[e as Events[number]];
        if (eventCallbacks) {
          for (const fn of eventCallbacks) {
            fn(...args);
          }
        }
      };

      // Create subscriber: subscribe.onEventName(cb)
      const key =
        `on${this.capitalize(e)}` as `on${Capitalize<Events[number]>}`;
      (
        this.subscribe as Record<
          string,
          (cb: (...args: unknown[]) => void) => () => void
        >
      )[key] = (cb: (...args: unknown[]) => void) => {
        const eventCallbacks = this.callbacks[e as Events[number]];
        if (eventCallbacks) {
          eventCallbacks.push(cb);
        }
        // return unsubscribe function
        return () => {
          const arr = this.callbacks[e as Events[number]];
          if (arr) {
            const idx = arr.indexOf(cb);
            if (idx >= 0) arr.splice(idx, 1);
          }
        };
      };
    }
  }

  /**
   * Clears callbacks for a specific event, or for all events if no event is provided.
   * @param event - optional event name to clear. If omitted, clears all callbacks for every event.
   */
  clear(event?: Events[number]): void {
    if (event) {
      (this.callbacks as Record<string, ((...args: unknown[]) => void)[]>)[
        event
      ] = [];
    } else {
      for (const e of this.events) {
        (this.callbacks as Record<string, ((...args: unknown[]) => void)[]>)[
          e
        ] = [];
      }
    }
  }

  /**
   * Capitalizes the first character of a string at runtime.
   * Also used to build subscriber method names (e.g. `onFoo`).
   */
  private capitalize<S extends string>(s: S): Capitalize<S> {
    return (s.charAt(0).toUpperCase() + s.slice(1)) as Capitalize<S>;
  }
}
