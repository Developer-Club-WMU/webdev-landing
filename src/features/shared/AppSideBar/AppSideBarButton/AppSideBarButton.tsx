import Link from "next/link";
import type { SidebarButtonProps } from "@/models";

interface AppSidebarButtonProps extends SidebarButtonProps {
    isOpen: boolean;
    prefix: string;
    clickable: boolean;
}

const AppSidebarButton = ({
    onClick,
    link,
    isOpen,
    prefix,
    clickable,
}: AppSidebarButtonProps) => {
    const content = (
        <Content
            onClick={onClick}
            link={link}
            isOpen={isOpen}
            prefix={prefix}
        />
    );

    return clickable ? (
        <LinkWrapper link={link.link}>{content}</LinkWrapper>
    ) : (
        <SimpleWrapper>{content}</SimpleWrapper>
    );
};

export default AppSidebarButton;

// -- Internal components --

const Content = ({
    onClick,
    link,
    isOpen,
    prefix,
}: SidebarButtonProps & { isOpen: boolean; prefix: string }) => {
    const baseStyle = "w-full rounded-sm px-1 cursor-pointer text-left";
    const textColor = isOpen
        ? "text-text bg-bg-muted dark:text-text"
        : "text-text hover:bg-bg-muted dark:text-text-inverted dark:hover:text-text";

    return (
        <button onClick={onClick} className={`${baseStyle} ${textColor}`}>
            <span className={isOpen ? "font-bold" : "font-light"}>{prefix}</span>
            <span
                style={{
                    color: `var(--color-${link.titleColor})`,
                    fontWeight: "bold",
                }}
            >
                {" " + link.title}
            </span>
        </button>
    );
};

const LinkWrapper = ({
    link,
    children,
}: {
    link: string;
    children: React.ReactNode;
}) => {
    return <Link href={link}>{children}</Link>;
};

const SimpleWrapper = ({ children }: { children: React.ReactNode }) => {
    return <div>{children}</div>;
};
