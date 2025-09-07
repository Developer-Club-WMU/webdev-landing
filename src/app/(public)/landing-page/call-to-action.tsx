import { SVG_DISCORD } from "@/features/shared/svgs/svg";
import Link from "next/link";

const base =
  "inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium " +
  "transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 " +
  "focus-visible:ring-indigo-500 disabled:opacity-60 disabled:cursor-not-allowed";
const primary =
  "bg-indigo-600 text-white hover:bg-indigo-500 active:bg-indigo-700 " +
  "dark:bg-white dark:text-black dark:hover:bg-slate-100";
const outline =
  "border border-slate-300 text-slate-900 hover:bg-slate-50 active:bg-slate-100 " +
  "dark:border-white/20 dark:text-white dark:hover:bg-white/10";

const IconPlaceholder = () => (
  <span aria-hidden className="h-4 w-4 invisible" />
);

const CallToActionButtons = () => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-md mx-auto">
      {/* Equal width; placeholder keeps label centered */}
      <Link
        href="/auth/signin"
        className={`${base} ${primary} w-full sm:w-48`}
        aria-label="Join now"
      >
        <IconPlaceholder />
        <span className="whitespace-nowrap">Join</span>
        <IconPlaceholder />
      </Link>

      <Link
        href="https://discord.gg/G9yE5s6NFM"
        target="_blank"
        rel="noopener noreferrer"
        className={`${base} ${outline} w-full sm:w-48`}
        aria-label="Join our Discord"
      >
        <SVG_DISCORD className="h-4 w-4" />
        <span className="whitespace-nowrap">Discord</span>
        <IconPlaceholder />
      </Link>
    </div>
  );
};

export default CallToActionButtons;
