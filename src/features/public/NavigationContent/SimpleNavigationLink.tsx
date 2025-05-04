import Link from "next/link";
import type { SideBarLinkLeaf } from "@/models";

const SimpleNavigationLink = ({ value }: { value: SideBarLinkLeaf }) => (
    <Link href={value.link}>
        <button
            className="w-full rounded-sm px-1 cursor-pointer text-left hover:bg-bg-muted text-text dark:text-text-inverted dark:hover:text-text"
        >
            {value.icon + " "}
            <span>{value.title}</span>
        </button>
    </Link>
);

export default SimpleNavigationLink;
