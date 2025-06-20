"use client";

import WelcomeSummary from "@/features/shared/Dashboard/Greetings/WelcomeSummary";
import { api } from "@/trpc/react";

const OfficerClient = () => {
  const create = api.crm.tasks.create.useMutation({
    onSuccess: () => {
      console.log("✅ Task created");
    },
    onError: (error) => {
      console.error("❌ Task creation failed:", error);
    },
  });

  return (
    <div className="info-page space-y-4 p-4">
      <WelcomeSummary />

      <button
        onClick={() => {
          create.mutate({
            title: "Demo Task",
            description: "Created from OfficerPage test",
            status: "TODO",
            priority: "MEDIUM",
            createdBy: {
            },
          });
        }}
        className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
      >
        ➕ Create Task
      </button>

      <button
        onClick={() => {
          console.log("📄 List Tasks clicked");
        }}
        className="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700"
      >
        📄 List Tasks
      </button>
    </div>
  );
};

export default OfficerClient;
