"use client"

import Link from "next/link";
import { useAppTopNav } from "./useAppTopNav";
import OfficerNavigationContent from "../../AppSideBar/OfficerNavigationContent/OfficerNavigationContent";
import { useCachedSession } from "@/hooks/userCachedSession";

const AppTopNav = () => {
  const { isOpen, toggleOpen, closeNavAndResetSidebar } = useAppTopNav();

  const session = useCachedSession();

  if (!session.data) return <div>...Could not verify</div>

  const user = session.data.user;

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
              😁{" "}
              <span className="text-text dark:text-text-inverted text-xl font-black uppercase">
                {user.name}
                {/*Julio*/}
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
          <OfficerNavigationContent />
        </div>
      )}
    </>
  );
};

export default AppTopNav;
