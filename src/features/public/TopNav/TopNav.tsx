"use client";

import Link from "next/link";
import { useTopNav } from "./useTopNav";
import { topNavEmoji, topNavTitle } from "./top-nav.config";
import NavigationContent from "../NavigationContent/NavigationContent";

const TopNav = () => {
  const { isOpen, toggleOpen, closeNavAndResetSidebar } = useTopNav();

  return (
    <>
      {/* Top Navigation */}
      <div className="dark:bg-bg-inverted sticky top-0 z-30 backdrop-blur-md lg:hidden">
        <div className="border-border-muted dark:border-border border-opacity-20 flex items-center justify-between gap-2 border-b p-4">
          <Link href="/" className="flex items-center gap-1.5">
            <button
              onClick={closeNavAndResetSidebar}
              className="cursor-pointer"
            >
              {topNavEmoji}{" "}
              <span className="text-text dark:text-text-inverted text-xl font-black uppercase">
                {topNavTitle}
              </span>
            </button>
          </Link>

          <button
            onClick={toggleOpen}
            className="text-text dark:text-text-inverted cursor-pointer text-2xl"
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="bg-bg/80 dark:bg-bg-inverted/80 fixed inset-x-0 top-[64px] bottom-0 z-20 overflow-y-auto p-4 backdrop-blur-md lg:hidden">
          <NavigationContent />
        </div>
      )}
    </>
  );
};

export default TopNav;
