"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AppSideBarConfig } from "./useAppSideBar";
import type { AppSideBarProtocol } from "@/models";
import OfficerNavigationContent from "./OfficerNavigationContent/OfficerNavigationContent";

/**
 * Defines a reusable side bar that can be configured
 * and used at the layout level based on context
 */
const AppSideBar = () => {
    const pathname = usePathname();
    const config: AppSideBarProtocol = new AppSideBarConfig(pathname);

    return (
        <div className="min-w-[300px] hidden lg:flex flex-col h-screen sticky top-0 z-20 bg-bg dark:bg-bg-inverted shadow-xl dark:border-r border-gray-500/50">
            <div className="p-4 flex gap-2 items-center text-2xl border-b border-gray-500/10 dark:border-gray-500/50 text-text dark:text-text-inverted">
                <Link href="/officer" className="flex items-center gap-1.5">
                    <button onClick={() => config.clearOpenKey()} className="cursor-pointer">
                        {config.emoji}{" "}
                        <span className="font-black text-xl uppercase">{config.title}</span>
                    </button>
                </Link>
            </div>
            {<OfficerNavigationContent/>}
        </div>
    );
};

export default AppSideBar;
