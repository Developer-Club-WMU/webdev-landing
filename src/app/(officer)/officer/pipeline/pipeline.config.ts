import type {
  KanbanColumnHeader,
  LeadStatus,
  PipelineCellProps,
} from "@/models";
import type { LeadInfo } from "@/models/schema";

export const leadInfoList: LeadInfo[] = [];

export const pipelineDeals: PipelineCellProps[] = [];

export const pipelineStages: {
  status: LeadStatus;
  header: KanbanColumnHeader;
}[] = [
  {
    status: "new",
    header: {
      title: "New",
      totalItems: 0,
      control: {
        onClick: () => {
          // No action for default stage
        },
        icon: "🆕",
      },
      color: "#E0F2FE", // light blue
    },
  },
  {
    status: "working",
    header: {
      title: "Working",
      totalItems: 0,
      control: {
        onClick: () => {
          // No action for default stage
        },
        icon: "⚙️",
      },
      color: "#FEF9C3", // pale yellow
    },
  },
  {
    status: "qualified",
    header: {
      title: "Qualified",
      totalItems: 0,
      control: {
        onClick: () => {
          // No action for default stage
        },
        icon: "✅",
      },
      color: "#DCFCE7", // light green
    },
  },
  {
    status: "proposal",
    header: {
      title: "Proposal Sent",
      totalItems: 0,
      control: {
        onClick: () => {
          // No action for default stage
        },
        icon: "📄",
      },
      color: "#F0F9FF", // very light blue
    },
  },
  {
    status: "negotiation",
    header: {
      title: "Negotiation",
      totalItems: 0,
      control: {
        onClick: () => {
          // No action for default stage
        },
        icon: "🤝",
      },
      color: "#FDE68A", // amber
    },
  },
  {
    status: "closed_won",
    header: {
      title: "Won",
      totalItems: 0,
      control: {
        onClick: () => {
          // No action for default stage
        },
        icon: "🏆",
      },
      color: "#BBF7D0", // light green
    },
  },
  {
    status: "closed_lost",
    header: {
      title: "Lost",
      totalItems: 0,
      control: {
        onClick: () => {
          // No action for default stage
        },
        icon: "❌",
      },
      color: "#FECACA", // light red
    },
  },
];
