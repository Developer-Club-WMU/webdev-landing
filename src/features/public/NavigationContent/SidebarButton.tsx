import Link from "next/link";
import type { SidebarButtonProps } from "@/models";

const SidebarButton = ({ onClick, link, isOpen }: SidebarButtonProps & { isOpen: boolean }) => {
    const baseStyle = "w-full rounded-sm px-1 cursor-pointer text-left";
    const textColor = isOpen
        ? "text-text bg-bg-muted dark:text-text"
        : "text-text hover:bg-bg-muted dark:text-text-inverted dark:hover:text-text";

    return (
        <Link href={link.link}>
            <button onClick={onClick} className={`${baseStyle} ${textColor}`}>
                <span className={isOpen ? "font-bold" : "font-light"}>Developer</span>
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
};

export default SidebarButton;
