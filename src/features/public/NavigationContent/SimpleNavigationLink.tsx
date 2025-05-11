import Link from "next/link";
import type { SideBarLinkLeaf } from "@/models";

const SimpleNavigationLink = ({
  value: sidebarLinkLeaf,
}: {
  value: SideBarLinkLeaf;
}) => (
  <Link href={sidebarLinkLeaf.link}>
    <button className="hover:bg-bg-muted text-text dark:text-text-inverted dark:hover:text-text w-full cursor-pointer rounded-sm px-1 text-left">
      {sidebarLinkLeaf.icon + " "}
      <span>{sidebarLinkLeaf.title}</span>
    </button>
  </Link>
);

export default SimpleNavigationLink;
