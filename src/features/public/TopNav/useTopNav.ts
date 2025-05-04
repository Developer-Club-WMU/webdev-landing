import { useState } from "react";
import { publicSideBarManager } from "@/state/sidebar";

export function useTopNav() {
    const [isOpen, setIsOpen] = useState(false);

    function toggleOpen() {
        setIsOpen((prev) => !prev);
    }

    function closeNavAndResetSidebar() {
        publicSideBarManager.setOpenKey("");
        setIsOpen(false);
    }

    return {
        isOpen,
        toggleOpen,
        closeNavAndResetSidebar,
    };
}
