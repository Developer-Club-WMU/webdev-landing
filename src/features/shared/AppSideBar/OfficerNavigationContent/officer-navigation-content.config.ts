import type { AppSideBarLink, SideBarLinkLeaf } from "@/models";

export const officerlinks: AppSideBarLink[] = [
  {
    title: "",
    prefix: "CRM",
    titleColor: "ai",
    childLinks: [
      { title: "Contacts", icon: "👥", link: "/officer/crm/contacts" },
      { title: "Deals", icon: "💼", link: "/officer/crm/deals" },
      { title: "Follow Ups", icon: "🔁", link: "/officer/crm/follow-ups" },
    ],
    link: "/officer/crm",
  },
  {
    title: "",
    prefix: "CMS",
    titleColor: "app",
    childLinks: [
      { title: "Posts", icon: "📝", link: "/officer/cms/posts" },
      { title: "Pages", icon: "📄", link: "/officer/cms/pages" },
      { title: "Media", icon: "🖼️", link: "/officer/cms/media" },
    ],
    link: "/officer/cms",
  },
];

export const simpleOfficerLinks: SideBarLinkLeaf = {
  icon: "",
  title: "Home",
  link: "/officer",
};
