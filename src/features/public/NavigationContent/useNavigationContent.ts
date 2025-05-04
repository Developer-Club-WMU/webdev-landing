import { useEffect, useState } from "react";
import { publicSideBarManager } from "@/state/sidebar";

export function useNavigationLinkOpenState(title: string) {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const listener = (openKey: string) => {
            setIsOpen(openKey === title);
        };

        publicSideBarManager.subscribe(listener);
        setIsOpen(publicSideBarManager.getOpenKey() === title);

        return () => {
            publicSideBarManager.unsubscribe(listener);
        };
    }, [title]);

    const handleOpen = () => {
        publicSideBarManager.setOpenKey(isOpen ? "" : title);
    };

    return { isOpen, handleOpen };
}
