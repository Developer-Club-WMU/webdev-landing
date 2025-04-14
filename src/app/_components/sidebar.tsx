"use client"

import Link from "next/link";
import NavigationContent from "./navigation-content";
import { sideBarManager } from "@/state/side-bar-manager";

const SideBar = () => {
    return (
        <div className={`min-w-[300px] hidden lg:flex flex-col h-screen sticky top-0 z-20 bg-bg dark:bg-bg-inverted shadow-xl dark:border-r border-gray-500/50`}>
            <div className="p-4 flex gap-2 items-center text-2xl border-b border-gray-500/10 dark:border-gray-500/50 text-text dark:text-text-inverted">
                <Link href="/" className="flex items-center gap-1.5">
                    <button 
                        onClick={() => sideBarManager.setOpenKey("")} 
                        className="cursor-pointer"
                    >
                        🏀 <span className="font-black text-xl uppercase">WMU Developer</span>
                    </button>
                </Link>
            </div>
            <NavigationContent/>
        </div>
    );
};

export default SideBar;
