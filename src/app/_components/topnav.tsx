"use client";

import { useState } from "react";
import NavigationContent from "./navigation-content";
import Link from "next/link";
import { sideBarManager } from "@/state/side-bar-manager";

const TopNav = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* Top Navigation */}
            <div className="lg:hidden sticky top-0 z-30 dark:bg-bg-inverted backdrop-blur-md">
                <div className="p-4 flex gap-2 items-center justify-between border-b border-border-muted dark:border-border border-opacity-20">
                    <Link href="/" className="flex items-center gap-1.5">
                        <button 
                            onClick={() => {sideBarManager.setOpenKey(""); setIsOpen(false)}} 
                            className="cursor-pointer"
                        >
                            🏀 <span className="font-black text-xl text-text dark:text-text-inverted uppercase">WMU Developer</span>
                        </button>
                    </Link>

                    <button onClick={() => setIsOpen((value) => !value)} className="text-text dark:text-text-inverted text-2xl cursor-pointer">
                        ☰
                    </button>
                </div>
            </div>
            {/* Mobile Drawer */}
            {isOpen && (
                <div
                    className="fixed lg:hidden inset-x-0 top-[64px] bottom-0 z-20 bg-bg/80 dark:bg-bg-inverted/80 backdrop-blur-md p-4 overflow-y-auto"
                >
                    <NavigationContent />
                </div>
            )}
        </>
    );
};

export default TopNav;
