import type { LeadInfo } from "@/models/schema";
import React from "react";
import RecentActivityComponent from "../RecentActivity/RecentActivity";
import {
  leadConversations,
  leadMessages,
} from "../RecentActivity/recent-activitiy.config";

interface LeadSummaryPanelProps {
  lead: LeadInfo;
}

const LeadSummaryPanel: React.FC<LeadSummaryPanelProps> = ({
  lead,
}: {
  lead: LeadInfo;
}) => {
  const formattedCapital = lead.capitalValue
    ? `$${lead.capitalValue.toLocaleString()}`
    : "—";

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  console.log("Hello");

  return (
    <div className="flex flex-col gap-4 p-2 text-sm text-gray-800 dark:text-white">
      <div className="flex items-center gap-4">
        {lead.avatarURL ? (
          <img
            src={lead.avatarURL}
            alt={lead.contactName}
            className="h-14 w-14 rounded-full object-cover shadow"
          />
        ) : (
          <div className="h-14 w-14 rounded-full bg-gray-300 dark:bg-gray-700" />
        )}
        <div>
          <h2 className="text-lg font-semibold">{lead.contactName}</h2>
          <p className="text-gray-500 dark:text-gray-400">{lead.companyName}</p>
        </div>
      </div>

      <div>
        <h3 className="font-medium text-gray-700 dark:text-gray-300">Deal</h3>
        <p className="text-base font-semibold">{lead.title}</p>
        <p className="text-gray-600 dark:text-gray-400">{lead.description}</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Info label="Capital" value={formattedCapital} />
        <Info label="Status" value={lead.status} />
        <Info label="Lead Type" value={lead.leadType} />
        <Info label="Stage" value={lead.pipelineStage ?? "—"} />
        <Info label="Added On" value={formatDate(lead.addedOn)} />
        <Info label="Due Date" value={formatDate(lead.dueDate)} />
        <Info label="Source" value={lead.source ?? "—"} />
        <Info label="Archived" value={lead.isArchived ? "Yes" : "No"} />
      </div>

      {lead.tags && lead.tags.length > 0 && (
        <div>
          <h3 className="font-medium text-gray-700 dark:text-gray-300">Tags</h3>
          <div className="mt-1 flex flex-wrap gap-2">
            {lead.tags.map((tag, idx) => (
              <span
                key={idx}
                className="rounded-full bg-gray-200 px-3 py-1 text-xs text-gray-700 dark:bg-gray-700 dark:text-white"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
      <RecentActivityComponent
        conversations={leadConversations}
        messages={leadMessages}
        userMap={{
          abc123: "Alice Thompson",
          def456: "John Rivera",
        }}
      />
    </div>
  );
};

const Info = ({ label, value }: { label: string; value: string }) => (
  <div className="flex flex-col">
    <span className="text-xs text-gray-500 dark:text-gray-400">{label}</span>
    <span className="font-medium">{value}</span>
  </div>
);

export default LeadSummaryPanel;
