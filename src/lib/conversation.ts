import type { BaseEntity, EntityType, UUID } from "@/models";
import type {
  ConversationInfo,
  ConversationMessageInfo,
} from "@/models/schema";

/**
 * Contract for conversation utilities.
 */
export interface ConversationUtility {
  startConversation: (
    parentEntity: BaseEntity,
    participants?: UUID[],
  ) => ConversationInfo;

  pushToConversation: (
    conversationId: string,
    senderId: UUID,
    body: string,
  ) => ConversationMessageInfo;

  getMessages: (conversationId: UUID) => ConversationMessageInfo[];
}

export class ConversationUtil {
  private static instance: ConversationUtil | null = null;

  // These will be initialized in the constructor
  private conversations: Map<UUID, ConversationInfo>;
  private messages: Map<UUID, ConversationMessageInfo[]>;

  private constructor() {
    this.conversations = new Map<UUID, ConversationInfo>();
    this.messages = new Map<UUID, ConversationMessageInfo[]>();
  }

  public static getInstance(): ConversationUtil {
    ConversationUtil.instance ??= new ConversationUtil();
    return ConversationUtil.instance;
  }

  public startConversation(
    parentEntity: BaseEntity,
    participants: UUID[],
    entityType: EntityType,
    subject?: string,
  ): ConversationInfo {
    const id: UUID = "";

    const convo: ConversationInfo = {
      ID: "",
      // _key: "",
      participants,
      subject,
      relatedEntityID: "",
      // relatedEntityKey: parentEntity._key,
      entityType,
      createdAt: new Date(),
      updatedOn: new Date(),
    };

    this.conversations.set(id, convo);
    this.messages.set(id, []);
    return convo;
  }

  public pushToConversation(
    conversationID: UUID,
    senderID: UUID,
    body: string,
  ): ConversationMessageInfo {
    const convo = this.conversations.get(conversationID);
    if (!convo) throw new Error(`Conversation ${conversationID} not found`);

    const message: ConversationMessageInfo = {
      ID: "",
      conversationID,
      senderID,
      body,
      createdAt: new Date(),
      updatedOn: new Date(),
    };

    this.messages.get(conversationID)!.push(message);
    convo.updatedOn = new Date();
    convo.lastMessageAt = message.createdAt;
    return message;
  }

  public getMessages(conversationID: UUID): ConversationMessageInfo[] {
    return this.messages.get(conversationID) ?? [];
  }

  public getConversation(conversationID: UUID): ConversationInfo | undefined {
    return this.conversations.get(conversationID);
  }
}
