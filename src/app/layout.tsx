import "@/styles/globals.css";

import { type Metadata } from "next";
import { Geist } from "next/font/google";
import SideBar from "../features/public/Sidebar/SideBar";
import TopNav from "../features/public/TopNav/TopNav";

export const metadata: Metadata = {
    title: "WMU Developer Club",
    description:
        "A student-led tech club focused on learning and building through hands-on experiences. Explore Web, AI, and App development with us.",
    keywords: [
        "WMU Developer Club",
        "Western Michigan University",
        "web development",
        "ai development",
        "app development",
        "student tech club",
        "learning to code",
        "college programming",
        "developer community",
        "wmich dev club"
    ],
    authors: [{ name: "WMU Developer Club", url: "https://webdev-landing-three.vercel.app" }],
    creator: "WMU Developer Club",
    publisher: "WMU Developer Club",
    icons: [{ rel: "icon", url: "/favicon.ico" }],
    openGraph: {
        title: "WMU Developer Club",
        description:
            "A hands-on tech community where students learn and build in Web, AI, and App development. Join us and grow your skills.",
        url: "https://webdev-landing-three.vercel.app",
        siteName: "WMU Developer Club",
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "WMU Developer Club",
        description:
            "Join a student community that builds and learns across Web, AI, and App development.",
        // creator: "@wmu_devclub", // Replace with actual handle if available
    },
};

const geist = Geist({
    subsets: ["latin"],
    variable: "--font-geist-sans",
});

export default function RootLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en" className={`${geist.variable}`}>
            <body className="min-h-screen flex flex-col min-w-0 lg:flex-row w-full transition-all duration-300">
                <SideBar/>
                <TopNav/>
                {children}
            </body>
        </html>
    );
}
