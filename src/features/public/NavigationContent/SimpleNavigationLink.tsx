import Link from "next/link";
import type { SideBarLinkLeaf } from "@/models";

const SimpleNavigationLink = ({ value: sidebarLinkLeaf }: { value: SideBarLinkLeaf }) => (
    <Link href={sidebarLinkLeaf.link}>
        <button
            className="w-full rounded-sm px-1 cursor-pointer text-left hover:bg-bg-muted text-text dark:text-text-inverted dark:hover:text-text"
        >
            {sidebarLinkLeaf.icon + " "}
            <span>{sidebarLinkLeaf.title}</span>
        </button>
    </Link>
);

export default SimpleNavigationLink;
