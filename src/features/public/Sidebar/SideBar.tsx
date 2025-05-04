"use client";

import Link from "next/link";
import { useSideBar } from "./useSideBar";
import { sidebarEmoji, sidebarTitle } from "./side-bar.config";
import NavigationContent from "../NavigationContent/NavigationContent";

const SideBar = () => {
    const { clearOpenKey } = useSideBar();

    return (
        <div className="min-w-[300px] hidden lg:flex flex-col h-screen sticky top-0 z-20 bg-bg dark:bg-bg-inverted shadow-xl dark:border-r border-gray-500/50">
            <div className="p-4 flex gap-2 items-center text-2xl border-b border-gray-500/10 dark:border-gray-500/50 text-text dark:text-text-inverted">
                <Link href="/" className="flex items-center gap-1.5">
                    <button onClick={clearOpenKey} className="cursor-pointer">
                        {sidebarEmoji} <span className="font-black text-xl uppercase">{sidebarTitle}</span>
                    </button>
                </Link>
            </div>
            <NavigationContent />
        </div>
    );
};

export default SideBar;
