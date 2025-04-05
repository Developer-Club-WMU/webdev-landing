"use client"

import type { 
    SidebarButtonProps, 
    SideBarLink, 
    SideBarLinkLeaf 
} from "@/api/apis";
import Link from "next/link";
import { useEffect, useState } from "react";
import SearchBar from "./search-input.component";
import { sideBarManager } from "@/state/side-bar-manager";

const SideBar = () => {

    /* Mock data, change when done */
    const leafs: SideBarLinkLeaf[] = [
        { title: "Dashboard", icon: "📊", link: "/" },
        { title: "Reports", icon: "📈", link: "/" },
        { title: "Settings", icon: "⚙️", link: "/" }
    ];

    const links: SideBarLink[] = [
        {
            title: "Web",
            titleColor: "web",
            childLinks: leafs,
            link: "/web"
        },
        {
            title: "AI",
            titleColor: "ai",
            childLinks: leafs,
            link: "/ai"
        },
        {
            title: "Apps",
            titleColor: "app",
            childLinks: leafs,
            link: "/app"
        },
    ];

    const simpleLinks: SideBarLinkLeaf[] = [
        { title: "Merch", icon: "📊", link: "/merch" },
        { title: "Contact", icon: "📊", link: "/contact" },
        { title: "About Us", icon: "📊", link: "/about-us" },
        { title: "Events", icon: "📊", link: "/events" },
    ];

    return (
        <div className="min-w-[300px] hidden lg:flex flex-col h-screen sticky top-0 z-20 bg-bg dark:bg-bg-inverted shadow-xl dark:border-r border-gray-500/20">
            <div className="p-4 flex gap-2 items-center text-2xl border-b border-gray-500/10 dark:border-gray-500/20 text-text dark:text-text-inverted">
                <Link href="/" className="flex items-center gap-1.5">
                    <button 
                        onClick={() => sideBarManager.setOpenKey("")} 
                        className="cursor-pointer"
                    >
                        🏀 <span className="font-black text-xl uppercase">WMU Developer</span>
                    </button>
                </Link>
            </div>
            <SearchBar/>
            <div className="p-2 flex flex-col gap-1 border-b border-gray-500/10 dark:border-gray-500/20">
                {links.map((link, index) => (
                    <div key={index}>
                        <SideBarLinkComponent link={link} />
                    </div>
                ))}
            </div>
            <div className="p-2 flex flex-col gap-1 border-b border-gray-500/10 dark:border-gray-500/20">
                {simpleLinks.map((link, index) => (
                    <div key={index}>
                        <SimpleSideBarLink value={link} index={index}/>
                    </div>
                ))}
            </div>
        </div>
    );
};

const SimpleSideBarLink = ({ value, index }: { value: SideBarLinkLeaf, index: number}) => {
    return (
        <Link key={index} href={value.link}>
            <button
                className="
                w-full 
                rounded-sm 
                px-1 
                cursor-pointer 
                text-left 
                hover:bg-bg-muted 
                text-text 
                dark:text-text-inverted
                dark:hover:text-text
                "
            >
                {value.icon + " "}
                <span className="text-left">{value.title}</span>
            </button>
        </Link>
    )
}

export default SideBar;

const SideBarLinkComponent = ({ link }: { link: SideBarLink }) => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const listener = (openKey: string) => {
            setIsOpen(openKey === link.title);
        };

        sideBarManager.subscribe(listener);
        setIsOpen(sideBarManager.getOpenKey() === link.title);

        return () => {
            sideBarManager.unsubscribe(listener);
        };
    }, [link.title]);

    const handleOpen = () => {
        sideBarManager.setOpenKey(isOpen ? "" : link.title);
    };

    return (
        <div>
            {isOpen ? (
                <OpenSidebarButton onClick={handleOpen} link={link} />
            ) : (
                    <ClosedSidebarButton onClick={handleOpen} link={link} />
                )}

            {isOpen && (
                <div className="block ml-4 mt-1">
                    {link.childLinks?.map((value: SideBarLinkLeaf, index: number) => (
                        <div key={index}>
                        <SimpleSideBarLink value={value} index={index}/>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

// MARK: - TODO
/* Refactor this into one component with a state value */
/* Decided not to refactor since doing so will place too much logic inside this component */
const OpenSidebarButton = ({ onClick, link }: SidebarButtonProps) => (
    <Link
        href={link.link}
    >
        <button
            onClick={onClick}
            className="w-full rounded-sm px-1 cursor-pointer text-left text-text bg-bg-muted hover:bg-bg-muted dark:text-text dark:hover:text-text"
        >
            <span className="font-bold">Developer</span>
            <span
                style={{
                    color: `var(--color-${link.titleColor})`,
                    fontWeight: "bold",
                }}
            >
                {" " + link.title}
            </span>
        </button>
    </Link>
);

const ClosedSidebarButton = ({ onClick, link }: SidebarButtonProps) => (
    <Link
        href={link.link}
    >
        <button
            onClick={onClick}
            className="w-full rounded-sm px-1 cursor-pointer text-left text-text hover:bg-bg-muted dark:text-text-inverted dark:hover:text-text"
        >
            <span className="font-light">Developer</span>
            <span
                style={{
                    color: `var(--color-${link.titleColor})`,
                    fontWeight: "bold",
                }}
            >
                {" " + link.title}
            </span>
        </button>
    </Link>
);
