import type {
  ConversationInfo,
  ConversationMessageInfo,
} from "@/models/schema";

export const leadMessages: ConversationMessageInfo[] = [
  {
    ID: "msg-1",
    createdAt: new Date("2025-04-02T15:00:00"),
    updatedOn: new Date("2025-04-02T15:00:00"),
    conversationID: "conv-1",
    senderID: "user-2",
    body: "Thanks for the great kickoff call. I've attached the meeting notes.",
  },
  {
    ID: "msg-2",
    createdAt: new Date("2025-04-02T15:30:00"),
    updatedOn: new Date("2025-04-02T15:30:00"),
    conversationID: "conv-1",
    senderID: "user-1",
    body: "Appreciate it! We'll review the notes and follow up by next Monday.",
  },
  {
    ID: "msg-3",
    createdAt: new Date("2025-04-03T10:45:00"),
    updatedOn: new Date("2025-04-03T10:45:00"),
    conversationID: "conv-2",
    senderID: "user-1",
    body: "Can you clarify if the homepage should also support mobile filtering?",
  },
];

export const leadConversations: ConversationInfo[] = [
  {
    ID: "conv-1",
    createdAt: new Date("2025-04-01"),
    updatedOn: new Date("2025-04-02"),
    subject: "Kickoff Call Follow-up",
    participants: ["user-1", "user-2"],
    relatedEntityID: "1", // same as Alice's lead ID
    relatedEntityKey: "Lead",
    entityType: "lead",
    lastMessageAt: new Date("2025-04-02T15:30:00"),
  },
  {
    ID: "conv-2",
    createdAt: new Date("2025-04-03"),
    updatedOn: new Date("2025-04-03"),
    subject: "Design Requirements Clarification",
    participants: ["user-1"],
    relatedEntityID: "1",
    relatedEntityKey: "Lead",
    entityType: "lead",
    lastMessageAt: new Date("2025-04-03T10:45:00"),
  },
  {
    ID: "conv-3",
    createdAt: new Date("2025-04-03"),
    updatedOn: new Date("2025-04-03"),
    subject: "Design Requirements Clarification",
    participants: ["user-1"],
    relatedEntityID: "1",
    relatedEntityKey: "Lead",
    entityType: "lead",
    lastMessageAt: new Date("2025-04-03T10:45:00"),
  },
];
