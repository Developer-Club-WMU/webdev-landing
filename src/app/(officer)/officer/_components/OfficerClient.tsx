"use client";

import WelcomeSummary from "@/features/shared/Dashboard/Greetings/WelcomeSummary";

const OfficerClient = () => {
  return (
    <div className="info-page space-y-4 p-4">
      <WelcomeSummary />

      <button
        onClick={() => {
          // create.mutate({
          //   title: "Demo Task",
          //   description: "Created from OfficerPage test",
          //   status: "TODO",
          //   priority: "MEDIUM",
          //   createdBy: {
          //   },
          // });
        }}
        className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
      >
        ➕ Create Task
      </button>

      <button
        onClick={() => {
          // List tasks functionality not implemented yet
        }}
        className="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700"
      >
        📄 List Tasks
      </button>
    </div>
  );
};

export default OfficerClient;
