import { localUser } from "@/models/config";

const WelcomeSummary = () => {
  const user = localUser;

  return (
    <div className="space-y-8">
      {/* Greeting Section */}
      <header className="border-border-muted border-b pb-4 dark:border-[#333]">
        <h1 className="text-text text-3xl font-semibold sm:text-4xl dark:text-gray-100">
          Welcome back, {user.firstName}
        </h1>
        <p className="text-text-muted mt-1 dark:text-gray-400">
          Here&apos;s a quick snapshot of your officer activity.
        </p>
      </header>

      {/* Summary Cards */}
      <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <SummaryCard
          title="Pending Tasks"
          value="4"
          description="Due today"
          accent="red"
        />
        <SummaryCard
          title="New Leads"
          value="2"
          description="Awaiting follow-up"
          accent="blue"
        />
        <SummaryCard
          title="CMS Drafts"
          value="3"
          description="Ready to review"
          accent="yellow"
        />
      </section>
    </div>
  );
};

export default WelcomeSummary;

// ────────────────────────────────────────────────
// Card Component with dark styling and icon support
const SummaryCard = ({
  title,
  value,
  description,
  accent,
}: {
  title: string;
  value: string | number;
  description: string;
  accent: "blue" | "red" | "yellow" | "green";
}) => {
  const accentMap: Record<typeof accent, string> = {
    blue: "text-blue-400",
    red: "text-red-400",
    yellow: "text-yellow-400",
    green: "text-green-400",
  };

  return (
    <div className="rounded-md border border-[#333] bg-[#121212] p-5 shadow-md transition-all hover:border-[#555]">
      <h3 className={`text-sm font-medium text-gray-400`}>{title}</h3>
      <p className="mt-1 text-2xl font-semibold text-gray-100">{value}</p>
      <p className={`mt-2 text-xs ${accentMap[accent]}`}>{description}</p>
    </div>
  );
};
