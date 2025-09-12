import type {
  ConversationInfo,
  ConversationMessageInfo,
} from "@/models/schema";
import React from "react";

interface RecentActivityComponentProps {
  conversations: ConversationInfo[];
  messages: ConversationMessageInfo[];
  userMap?: Record<string, string>; // Optional: userID → display name
}

const RecentActivityComponent: React.FC<RecentActivityComponentProps> = ({
  conversations,
  messages,
  userMap = {},
}) => {
  const getLastMessageSnippet = (conversationID: string): string => {
    const convoMessages = messages
      .filter((msg) => msg.conversationID === conversationID)
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );

    const lastMessage = convoMessages[0];
    return lastMessage ? truncate(lastMessage.body, 100) : "No messages yet.";
  };

  const truncate = (text: string, maxLength: number) =>
    text.length > maxLength ? text.slice(0, maxLength) + "..." : text;

  const formatDate = (date?: Date) =>
    date
      ? new Date(date).toLocaleDateString(undefined, {
          year: "numeric",
          month: "short",
          day: "numeric",
        })
      : "—";

  return (
    <div className="flex flex-col gap-4 text-sm text-gray-800 dark:text-white">
      <h2 className="text-base font-semibold text-gray-700 dark:text-white">
        Recent Activity
      </h2>
      {conversations.length === 0 && (
        <p className="text-gray-500 dark:text-gray-400">
          No recent conversations.
        </p>
      )}
      <ul className="flex flex-col gap-4">
        {conversations
          .sort(
            (a, b) =>
              (b.lastMessageAt?.getTime() ?? 0) -
              (a.lastMessageAt?.getTime() ?? 0),
          )
          .map((convo) => (
            <li
              key={convo.ID}
              className="rounded border border-gray-300 p-4 dark:border-gray-700"
            >
              <div className="mb-2 flex items-center justify-between">
                <h3 className="font-medium">
                  {convo.subject ?? "Untitled Conversation"}
                </h3>
                <span className="text-xs text-gray-500">
                  {formatDate(convo.lastMessageAt)}
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                {getLastMessageSnippet(convo.ID)}
              </p>
              {convo.participants.length > 0 && (
                <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                  With:{" "}
                  {convo.participants
                    .map((id) => userMap[id] ?? `User ${id.slice(0, 6)}`)
                    .join(", ")}
                </div>
              )}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default RecentActivityComponent;
