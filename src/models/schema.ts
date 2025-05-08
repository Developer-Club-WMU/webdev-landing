import type { UserRole } from ".";

export interface User {
  /** Unique identifier for the user */
  id: string;

  /** Full name to display in the UI */
  fullName: string;

  /** Role determines access level and UI structure */
  role: UserRole;

  /** Email used for login, contact, or profile */
  email: string;

  /** Optional username/handle used internally or in public display */
  username?: string;

  /** Date the user joined the platform */
  createdAt: string;

  /** Last time user logged in or was active */
  lastActiveAt?: string;

  /** (Optional) Avatar image or profile photo URL */
  avatarUrl?: string;

  /** Optional department/group within the club (e.g. Web, AI) */
  department?: string;

  /** Indicates whether the user has been approved/verified */
  isApproved?: boolean;
}
