"use client";
import { links, simpleLinks } from "./navigation-content.config";
import { useNavigationLinkOpenState } from "./useNavigationContent";
import SidebarButton from "./SidebarButton";
import SimpleNavigationLink from "./SimpleNavigationLink";
import type { SideBarLink } from "@/models";
import Link from "next/link";

const NavigationContent = () => {
  return (
    <div className="flex flex-col justify-between h-full">
      <div>
        <div className="flex flex-col gap-1 border-b border-gray-500/10 p-2 dark:border-gray-500/50">
          {links.map((link, index) => (
            <NavigationLinkContainer key={index} link={link} />
          ))}
        </div>
        <div className="flex flex-col gap-1 border-b border-gray-500/10 p-2 dark:border-gray-500/50">
          {simpleLinks.map((link, index) => (
            <SimpleNavigationLink key={index} value={link} />
          ))}
        </div>
      </div>
      <div className="p-2 w-full flex">
          <Link
            className="standard-btn flex justify-center"
            href="auth/signin">
            Sign In
          </Link>
      </div>
    </div>
  );
};

const NavigationLinkContainer = ({ link }: { link: SideBarLink }) => {
  const { isOpen, handleOpen } = useNavigationLinkOpenState(link.title);

  return (
    <div>
      <SidebarButton isOpen={isOpen} onClick={handleOpen} link={link} />
      {isOpen && (
        <div className="mt-1 ml-4 block">
          {link.childLinks?.map((child, i) => (
            <SimpleNavigationLink key={i} value={child} />
          ))}
        </div>
      )}
    </div>
  );
};

export default NavigationContent;
// "use client"
// import { useEffect, useState } from "react";
// import Link from "next/link";
// import SearchBar from "../search-input.component";
// import { publicSideBarManager } from "@/state/sidebar";
// import type { SideBarLinkLeaf, SideBarLink, SidebarButtonProps } from "@/models";

// const NavigationContent = () => {

//     /* Links to communities, change icons to more appropriate when possible */
//     /* More relevant leaf links for student communities */
//     const leafs: SideBarLinkLeaf[] = [
//         { title: "Team Leads", icon: "📚", link: "/" },       // Page about team members
//         { title: "Projects", icon: "🛠️", link: "/" },        // Current or past projects
//         { title: "Get Involved", icon: "🤝", link: "/" },    // Info on how to join or contribute
//     ];

//     const links: SideBarLink[] = [
//         {
//             title: "Web",
//             titleColor: "web",
//             childLinks: leafs,
//             link: "/web"
//         },
//         {
//             title: "AI",
//             titleColor: "ai",
//             childLinks: leafs,
//             link: "/ai"
//         },
//         {
//             title: "Apps",
//             titleColor: "app",
//             childLinks: leafs,
//             link: "/app"
//         },
//         {
//             title: "Games",
//             titleColor: "games",
//             childLinks: leafs,
//             link: "/games"
//         },
//         {
//             title: "Systems",
//             titleColor: "systems",
//             childLinks: leafs,
//             link: "/systems"
//         },
//     ];

//     const simpleLinks: SideBarLinkLeaf[] = [
//         // { title: "Merch", icon: "📊", link: "/merch" },
//         { title: "Contact", icon: "📊", link: "/contact" },
//         { title: "About Us", icon: "📊", link: "/about-us" },
//         { title: "Events", icon: "📊", link: "/events" },
//     ];

//     return (
//         <div>
//             <SearchBar/>
//             <div className="p-2 flex flex-col gap-1 border-b border-gray-500/10 dark:border-gray-500/50">
//                 {links.map((link, index) => (
//                     <div key={index}>
//                         <NavigationLinkContainer link={link} />
//                     </div>
//                 ))}
//             </div>
//             <div className="p-2 flex flex-col gap-1 border-b border-gray-500/10 dark:border-gray-500/50">
//                 {simpleLinks.map((link, index) => (
//                     <div key={index}>
//                         <SimpleNavigationLink value={link} index={index}/>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     )
// }

// export default NavigationContent;

// export const NavigationLinkContainer = ({ link }: { link: SideBarLink }) => {
//     const [isOpen, setIsOpen] = useState(false);

//     useEffect(() => {
//         const listener = (openKey: string) => {
//             setIsOpen(openKey === link.title);
//         };

//         publicSideBarManager.subscribe(listener);
//         setIsOpen(publicSideBarManager.getOpenKey() === link.title);

//         return () => {
//             publicSideBarManager.unsubscribe(listener);
//         };
//     }, [link.title]);

//     const handleOpen = () => {
//         publicSideBarManager.setOpenKey(isOpen ? "" : link.title);
//     };

//     return (
//         <div>
//             {isOpen ? (
//                 <OpenSidebarButton onClick={handleOpen} link={link} />
//             ) : (
//                     <ClosedSidebarButton onClick={handleOpen} link={link} />
//                 )}

//             {isOpen && (
//                 <div className="block ml-4 mt-1">
//                     {link.childLinks?.map((value: SideBarLinkLeaf, index: number) => (
//                         <div key={index}>
//                         <SimpleNavigationLink value={value} index={index}/>
//                         </div>
//                     ))}
//                 </div>
//             )}
//         </div>
//     );
// };

// export const SimpleNavigationLink = ({ value, index }: { value: SideBarLinkLeaf, index: number}) => {
//     return (
//         <Link key={index} href={value.link}>
//             <button
//                 className="
//                 w-full
//                 rounded-sm
//                 px-1
//                 cursor-pointer
//                 text-left
//                 hover:bg-bg-muted
//                 text-text
//                 dark:text-text-inverted
//                 dark:hover:text-text
//                 "
//             >
//                 {value.icon + " "}
//                 <span className="text-left">{value.title}</span>
//             </button>
//         </Link>
//     )
// }

// // MARK: - TODO
// /* Refactor this into one component with a state value */
// /* Decided not to refactor since doing so will place too much logic inside this component */
// const OpenSidebarButton = ({ onClick, link }: SidebarButtonProps) => (
//     <Link
//         href={link.link}
//     >
//         <button
//             onClick={onClick}
//             className="w-full rounded-sm px-1 cursor-pointer text-left text-text bg-bg-muted hover:bg-bg-muted dark:text-text dark:hover:text-text"
//         >
//             <span className="font-bold">Developer</span>
//             <span
//                 style={{
//                     color: `var(--color-${link.titleColor})`,
//                     fontWeight: "bold",
//                 }}
//             >
//                 {" " + link.title}
//             </span>
//         </button>
//     </Link>
// );

// const ClosedSidebarButton = ({ onClick, link }: SidebarButtonProps) => (
//     <Link
//         href={link.link}
//     >
//         <button
//             onClick={onClick}
//             className="w-full rounded-sm px-1 cursor-pointer text-left text-text hover:bg-bg-muted dark:text-text-inverted dark:hover:text-text"
//         >
//             <span className="font-light">Developer</span>
//             <span
//                 style={{
//                     color: `var(--color-${link.titleColor})`,
//                     fontWeight: "bold",
//                 }}
//             >
//                 {" " + link.title}
//             </span>
//         </button>
//     </Link>
// );
