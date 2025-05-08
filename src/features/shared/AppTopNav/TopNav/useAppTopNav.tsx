import { useState } from "react";
import { internalSideBarManager } from "@/state/sidebar";

export function useAppTopNav() {
    const [isOpen, setIsOpen] = useState(false);

    function toggleOpen() {
        setIsOpen((prev) => !prev);
    }

    function closeNavAndResetSidebar() {
        internalSideBarManager.setOpenKey("");
        setIsOpen(false);
    }

    return {
        isOpen,
        toggleOpen,
        closeNavAndResetSidebar,
    };
}
