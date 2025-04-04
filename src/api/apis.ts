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

export interface HeroDetails {
    title: string;
    description: string;
}
