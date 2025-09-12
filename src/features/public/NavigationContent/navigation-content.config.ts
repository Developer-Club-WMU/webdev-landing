import type { SideBarLinkLeaf, SideBarLink } from "@/models";

export const leafs: SideBarLinkLeaf[] = [
  { title: "Team Leads", icon: "👑", link: "/" },
  { title: "Projects", icon: "🚀", link: "/" },
  { title: "Get Involved", icon: "🙌", link: "/" },
];

export const links: SideBarLink[] = [
  { title: "Web", titleColor: "web", childLinks: leafs, link: "/web" },
  { title: "AI", titleColor: "ai", childLinks: leafs, link: "/ai" },
  { title: "Apps", titleColor: "app", childLinks: leafs, link: "/app" },
  { title: "Games", titleColor: "games", childLinks: leafs, link: "/games" },
  {
    title: "Hackathon",
    titleColor: "hackathon",
    childLinks: leafs,
    link: "/hackathon",
  },
  {
    title: "Systems",
    titleColor: "systems",
    childLinks: leafs,
    link: "/systems",
  },
];

export const simpleLinks: SideBarLinkLeaf[] = [
  { title: "Contact", icon: "✉️", link: "/contact" },
  { title: "About Us", icon: "❓", link: "/about-us" },
  { title: "Events", icon: "📅", link: "/events" },
  {
    title: "Available Projects",
    icon: "📅",
    link: "https://docs.google.com/spreadsheets/d/1WGBq8J4SkkRWzZ46qglfDs9ZAR24NnfnMqvFmy4EtaM/edit?gid=900231331#gid=900231331",
  },
];
