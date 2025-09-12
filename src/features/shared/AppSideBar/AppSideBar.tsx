"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AppSideBarConfig } from "./useAppSideBar";
import OfficerNavigationContent from "./OfficerNavigationContent/OfficerNavigationContent";
import { signOut, useSession } from "next-auth/react";

/**
 * Defines a reusable side bar that can be configured
 * and used at the layout level based on context
 */
const AppSideBar = () => {
  const pathname = usePathname();
  const { data: session } = useSession();
  const config = new AppSideBarConfig(pathname, session);

  return (
    <div className="bg-bg dark:bg-bg-inverted sticky top-0 z-20 hidden h-screen min-w-[300px] flex-col border-gray-500/50 shadow-xl lg:flex dark:border-r">
      <div className="flex flex-col h-full justify-between gap-2">
        <div>
          <div className="text-text dark:text-text-inverted flex items-center gap-2 border-b border-gray-500/10 p-4 text-2xl dark:border-gray-500/50">
            <Link href="/officer" className="flex items-center gap-1.5">
              <button
                onClick={() => config.clearOpenKey()}
                className="cursor-pointer"
              >
                <span className="text-xl font-black uppercase">
                  {config.title}
                </span>
              </button>
            </Link>
          </div>
          {<OfficerNavigationContent />}
        </div>
        <div className="p-2">
          <div className="flex flex-col gap-2">
          <Link
            href={"/join-community"}
            className="standard-btn flex justify-center"
          >
            Join A Community
          </Link>
          <button
            className="standard-btn"
            onClick={() => signOut({ callbackUrl: "/" })}
          >
            sign out
          </button>
        </div>
        </div>
      </div>
    </div>
  );
};

export default AppSideBar;
