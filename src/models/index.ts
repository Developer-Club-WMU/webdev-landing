import type { KanbanColumnViewModel } from "@/features/shared/Kanban/KanbanColumn/KanbanColumnViewModel";

export type UUID = string;
export type currency = number;
export type username = string;

// ─── String Literal Enums & Helper Types ─────────────────────
export type ActivityType = "call" | "email" | "meeting" | "note";

export type LeadStatus =
  | "new"
  | "working"
  | "qualified"
  | "unqualified"
  | "closed"
  | "negotiation"
  | "closed_won"
  | "closed_lost"
  | "proposal";

export type LeadType =
  | "individual"
  | "company"
  | "customer"
  | "partner"
  | "other"
  | "vendor";

export type TaskStatus = "open" | "in_progress" | "completed" | "deferred";

export type TodoStatus = "open" | "in_progress" | "completed" | "archived";

export type TodoPriority = "low" | "normal" | "high" | "urgent";

export type DealStage =
  | "prospecting"
  | "qualification"
  | "proposal"
  | "negotiation"
  | "closed_won"
  | "closed_lost";

// Generic target type for cross‑entity relations.
// Extend or narrow this union as your data model grows.
export type EntityType =
  | "contact"
  | "account"
  | "deal"
  | "user"
  | "task"
  | "product"
  | "campaign"
  | "custom";

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

export interface AppSideBarLink extends SideBarLink {
  prefix: string;
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

export interface DataObserver<T = unknown> {
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

export interface InfoNightContactInformation {
  name: string;
  email: string;
  department: string;
  message: string;
}

export const DEPARTMENTS = [
  "General",
  "Web",
  "AI",
  "Games",
  "Systems",
  "App",
  "Automation",
  "VR/AR",
  "Hackathon",
];

export interface SocialInformation {
  name: string;
  href: string;
  icon: React.ComponentType<{ size: number }>;
}

export interface AppSideBarProtocol {
  // This will change to something more professional
  emoji: string;

  /**
   * Defines the title of the sidebar
   */
  title: string;

  accountType: UserRole;

  clearOpenKey: () => void;
}

export type UserRole = "officer" | "member" | "client";

export interface UserInfo {
  ID: UUID; //UUID
  firstName: string;
  lastName: string;
  username: string;
}

/**
 * BaseEntity: anything that can have conversations attached.
 */
export interface BaseEntity {
  /** Database or partition key used for lookups */
  // _key: string;
  /** Timestamps */
  createdAt: Date;
  updatedOn: Date;
}

/**
 * Generic utility interface.
 */
export interface BaseUtility<T> {
  getInstance(): T;
}

/**
 * Basic Kanban interaction props shared across column cell components.
 */
export interface KanbanColumnCellProps {
  /**
   * Triggered when the user clicks on the card.
   * Typically used to open detail views or dialogs.
   */
  onClick?: (dealId: string) => void;

  /**
   * Called when a card starts dragging.
   * Provides the deal ID and its current pipeline stage.
   */
  // onDragStart?: (dealId: string, stage: string) => void;

  /**
   * Indicates whether the card is currently being dragged.
   * Can be used to apply visual styles.
   */
  isDragging?: boolean;
}

/**
 * Props for rendering a CRM pipeline card inside a Kanban column.
 * Represents a lead or deal with relevant metadata.
 */
export interface PipelineCellProps extends KanbanColumnCellProps {
  ID: string;
  /**
   * Primary title for the card — typically the deal or opportunity name.
   */
  title: string;

  /**
   * Supporting detail that summarizes the opportunity or contact.
   */
  description: string;

  /**
   * The financial value associated with this deal or lead.
   * Represented in a formatted currency string (e.g., "$10,000").
   */
  capital?: string;

  /**
   * Optional avatar image (e.g., lead owner or company logo).
   */
  avatarURL?: string;

  /**
   * Name of the lead person or main contact.
   */
  leadName: string;

  /**
   * Company or organization associated with the lead.
   */
  companyName: string;

  /**
   * ISO timestamp or formatted string representing when this card was added.
   */
  addedOn: Date;

  /**
   * ISO timestamp or formatted string for when this item is due or expected to close.
   */
  dueDate: Date;

  /**
   * Status of the lead (e.g., "qualified", "working", "closed").
   */
  status: LeadStatus;

  /**
   * Category or classification of this lead (e.g., "customer", "partner", "vendor").
   */
  leadType: LeadType;
}

export interface KanbanColumnProps {
  viewModel: KanbanColumnViewModel;
  onCardClick?: (dealId: string) => void;
  onCardDropped?: (dealId: string, newStage: string) => void;
}
