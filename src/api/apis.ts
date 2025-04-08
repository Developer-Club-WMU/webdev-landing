/**
 * Represents a top-level sidebar navigation item.
 * 
 * Used to group related child links and optionally link to a main section.
 * Each SideBarLink can have a unique title color and nested leaf links.
 */
export interface SideBarLink {
    /**
     * The main label displayed in the sidebar for this section.
     * 
     * @example "Web", "AI", "Apps"
     */
    title: string;

    /**
     * A color key (not a hex value) used to apply a unique color to the title.
     * 
     * This should match a CSS variable like `--color-web` so that styling can be dynamic.
     * 
     * @example "web", "ai", "app"
     */
    titleColor: string;

    /**
     * An optional list of child links that will be rendered
     * as nested clickable items under this top-level section.
     * 
     * When this section is expanded, these links appear indented.
     */
    childLinks?: SideBarLinkLeaf[];

    /**
     * A direct navigation route for the top-level section.
     * 
     * If this section is clickable even when closed (like a dashboard root),
     * this URL should be defined.
     * 
     * @example "/web", "/ai", "/apps"
     */
    link: string;
}

/**
 * Represents a clickable sub-item inside a SideBarLink section.
 * 
 * These are the leaf nodes in the sidebar hierarchy.
 */
export interface SideBarLinkLeaf {
    /**
     * A visual icon for the link, typically a path to an SVG file or emoji.
     * 
     * You may update this to `ReactNode` or a `ComponentType` if you're using inline SVG components.
     * 
     * @todo Consider using a better-typed icon component (e.g., ReactNode or dynamic import).
     * @example "📊", "path/to/icon.svg"
     */
    icon: string;

    /**
     * The text label shown for the leaf link.
     * 
     * @example "Dashboard", "Reports", "Settings"
     */
    title: string;

    /**
     * The navigation path to which this item links.
     * 
     * @example "/web/dashboard", "/ai/reports"
     */
    link: string;
}

/**
 * Props passed into sidebar toggle button components
 * (e.g. OpenSidebarButton, ClosedSidebarButton).
 */
export type SidebarButtonProps = {
    /**
     * Function to call when the button is clicked.
     */
    onClick: () => void;

    /**
     * The data for the main sidebar link this button represents.
     */
    link: SideBarLink;
};

/**
 * Represents the content and styling information used in a hero section component.
 * 
 * This is commonly used at the top of community pages (e.g., Web, AI, Apps) to 
 * display the community's name, short description, and styling based on the 
 * associated club color.
 */
export interface HeroDetails {
    /**
     * The main heading text (usually rendered inside an <h1>).
     * 
     * This is the prominent title for the hero section.
     * 
     * @example "Build the Future of the Web"
     */
    title: string;

    /**
     * A short supporting description (usually rendered inside an <h2>).
     * 
     * This provides a brief explanation of the page or section.
     * 
     * @example "We craft modern, accessible experiences using the latest web technologies."
     */
    description: string;

    /**
     * The color token associated with the community.
     * 
     * @example "web", "ai", "app"
     */
    color: string;

    /**
     * (Optional) Additional paragraph text rendered inside a <p> tag.
     * 
     * This is useful for giving more context or a longer explanation
     * below the main title and description.
     * 
     * @example "From React to full-stack TypeScript — explore how we turn ideas into impactful websites."
     */
    secondDescription?: string;
}


export type SidebarListener = (openKey: string) => void;

/**
 * Defines the contract for managing the state of an expandable sidebar.
 * 
 * This protocol allows sidebar components to subscribe to and react
 * to changes in the currently open sidebar section (e.g., "Web", "AI").
 * Only one top-level section is open at a time.
 */
export interface SideBarProtocol {
    /**
     * Subscribes a listener that will be notified whenever the open key changes.
     * 
     * @param listener - A function that receives the updated open key.
     */
    subscribe: (listener: SidebarListener) => void;

    /**
     * Unsubscribes a previously registered listener.
     * 
     * @param listener - The listener to remove.
     */
    unsubscribe: (listener: SidebarListener) => void;

    /**
     * Returns the currently open sidebar key.
     * 
     * @returns A string representing the active key. An empty string means none are open.
     */
    getOpenKey: () => string;

    /**
     * Sets the active open key and notifies all subscribers.
     * 
     * @param key - The new open key. Pass an empty string to close all sections.
     */
    setOpenKey: (key: string) => void;
}

export type EventID = string | null;

export interface DataObserver<T = any> {

    /**
     * Used to listen for an event, usually the value changes
     */
    addChangeListener: (listener: (value: T) => void) => EventID;

    /**
     * Function that is used to unsubscribe from an event
     * 
     * @param ID of the event that needs to be removed
     */
    removeListener: (ID: EventID) => void;

    /**
     * The observable value
     */
    value: T;
}