"use client";

import SimpleNavigationLink from "@/features/public/NavigationContent/SimpleNavigationLink";
import { useNavigationLinkOpenState } from "@/features/public/NavigationContent/useNavigationContent";
import { officerlinks, simpleOfficerLinks } from "./officer-navigation-content.config";
import type { AppSideBarLink } from "@/models";
import AppSidebarButton from "../AppSideBarButton/AppSideBarButton";

const OfficerNavigationContent = () => {
    return (
        <div>
            <NavigationCell
            props={
                <div>
                    <SimpleNavigationLink value={simpleOfficerLinks} />
                    {officerlinks.map((link, index) => (
                        <OfficerNavigationLinkContainer key={index} link={link} />
                    ))}
                </div>
            }
            />
        </div>
    );
};

const NavigationCell = ({ props }: {props: React.ReactNode }) => {
    return (
        <div className="p-2 flex flex-col gap-1 border-b border-gray-500/10 dark:border-gray-500/50">
            {props}
        </div>
    );
}

const OfficerNavigationLinkContainer = ({ link }: { link: AppSideBarLink }) => {
    const { isOpen, handleOpen } = useNavigationLinkOpenState(link.prefix);

    return (
        <div>
            <AppSidebarButton
            isOpen={isOpen}
            onClick={handleOpen}
            link={link}
            prefix={link.prefix}
            clickable={false}
            />
            {isOpen && (
                <div className="block ml-4 mt-1">
                    {link.childLinks?.map((child, i) => (
                        <SimpleNavigationLink key={i} value={child} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default OfficerNavigationContent;
