"use client";

import Link from "next/link";
import { useSideBar } from "./useSideBar";
import { sidebarEmoji, sidebarTitle } from "./side-bar.config";
import NavigationContent from "../NavigationContent/NavigationContent";

const SideBar = () => {
  const { clearOpenKey } = useSideBar();

  return (
    <div className="bg-bg dark:bg-bg-inverted sticky top-0 z-20 hidden h-screen min-w-[300px] flex-col border-gray-500/50 shadow-xl lg:flex dark:border-r">
      <div className="text-text dark:text-text-inverted flex items-center gap-2 border-b border-gray-500/10 p-4 text-2xl dark:border-gray-500/50">
        <Link href="/" className="flex items-center gap-1.5">
          <button onClick={clearOpenKey} className="cursor-pointer">
            {sidebarEmoji}{" "}
            <span className="text-xl font-black uppercase">{sidebarTitle}</span>
          </button>
        </Link>
      </div>
      <NavigationContent />
    </div>
  );
};

export default SideBar;
