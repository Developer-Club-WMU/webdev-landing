import "@/styles/globals.css";

import { type Metadata } from "next";
import { Geist } from "next/font/google";
import SideBar from "./_components/sidebar";
import TopNav from "./_components/topnav";

export const metadata: Metadata = {
    title: "Web Club",
    description: "WIP",
    icons: [{ rel: "icon", url: "/favicon.ico" }],
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
                <SideBar enforceVisibility={false} />
                <TopNav/>
                {children}
            </body>
        </html>
    );
}
