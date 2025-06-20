import type {
    ActivityType,
    DealStage,
    EntityType,
    LeadStatus,
    TaskStatus,
    TodoPriority,
    TodoStatus,
    UserRole,
    UUID
} from ".";

// ─── Core Schemas (all suffixed with “Info”) ─────────────────

export interface TodoInfo {
  id: UUID;
  title: string;
  description?: string;
  dueDate?: string;

  status: TodoStatus;
  priority: TodoPriority;

  ownerID: UUID;           // User who owns / was assigned the todo
  createdByID: UUID;       // Who created it
  createdAt: string;
  updatedAt: string;

  // Flexible linkage: attach to ANY entity
  relatedEntityId?: string;
  entityType?: EntityType;
}

export interface ConversationInfo {
  ID: UUID;
  subject?: string;

  // Array of User IDs involved in the thread
  participants: string[];

  // Optional linkage to any CRM entity
  relatedEntityId?: string;
  entityType?: EntityType;

  createdAt: string;
  updatedAt: string;
  lastMessageAt?: string;
}

export interface ConversationMessageInfo {
  ID: UUID;
  conversationID: UUID;   // FK → ConversationInfo.id
  senderID: UUID;         // User sending the message
  body: string;             // markdown / rich‑text / plain text
  createdAt: string;

  // Simple flag for read receipts—expand as needed
  isEdited?: boolean;
}

export interface UserInfo {
    ID: UUID;
    fullName: string;
    role: UserRole;
    email: string;
    username?: string;
    createdAt: string;
    lastActiveAt?: string;
    avatarUrl?: string;
    department?: string;
    isApproved?: boolean;
}

export interface AccountInfo {
    ID: UUID;
    name: string;
    industry?: string;
    website?: string;
    phone?: string;
    billingAddress?: string;
    ownerID: UUID;        // UserInfo.id
    createdAt: string;
    updatedAt: string;
}

export interface ContactInfo {
    ID: UUID;
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    accountId?: string;           // null while still a Lead
    leadStatus: LeadStatus;
    ownerID: UUID;
    createdAt: string;
    updatedAt: string;
}

export interface DealInfo {
    ID: UUID;
    name: string;
    accountID: UUID;
    amount: number;               // in smallest currency unit
    stage: DealStage;
    closeDate?: string;
    ownerID: UUID;
    createdAt: string;
    updatedAt: string;
}

export interface ActivityInfo {
    ID: UUID;
    type: ActivityType;
    subject: string;
    body?: string;
    timestamp: string;
    userID: UUID;               // who logged it
    contactId?: string;
    accountId?: string;
    dealId?: string;
}

export interface TaskInfo {
    ID: UUID;
    title: string;
    dueDate: string;
    status: TaskStatus;
    priority: "low" | "normal" | "high";
    ownerID: UUID;
    relatedContactId?: string;
    relatedDealId?: string;
    createdAt: string;
    updatedAt: string;
}

export interface PipelineStageInfo {
    ID: UUID;
    name: string;                 // e.g. "Prospecting"
    order: number;                // for sorting
    probability: number;          // 0–1 (e.g. 0.25=25%)
}

export interface ProductInfo {
    ID: UUID;
    name: string;
    sku: string;
    price: number;                // unit price
    description?: string;
    createdAt: string;
    updatedAt: string;
}

export interface NoteInfo {
    ID: UUID;
    body: string;
    authorID: UUID;
    relatedEntityID: UUID;      // could be contact, deal, etc.
    entityType: "contact" | "account" | "deal";
    createdAt: string;
    updatedAt: string;
}

export interface AttachmentInfo {
    ID: UUID;
    filename: string;
    url: string;
    uploadedByID: UUID;
    relatedEntityID: UUID;
    entityType: "contact" | "deal" | "account";
    createdAt: string;
}

export interface CampaignInfo {
    ID: UUID;
    name: string;
    startDate: string;
    endDate?: string;
    budget?: number;
    ownerID: UUID;
    createdAt: string;
}

/* ZOD SCHEMAS */
