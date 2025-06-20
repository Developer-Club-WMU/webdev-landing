import AppSideBar from "@/features/shared/AppSideBar/AppSideBar";
import AppTopNav from "@/features/shared/AppTopNav/TopNav/AppTopNav";
import "@/styles/globals.css";
import { TRPCReactProvider } from "@/trpc/react";
import { SessionProvider } from "next-auth/react";

export default function OfficerLayout({ children }: { children: React.ReactNode }) {
  return (
      <html lang="en" >
          <body className="min-h-screen flex flex-col min-w-0 lg:flex-row w-full transition-all duration-300">
              <AppSideBar />
              <AppTopNav />
              <SessionProvider>
                <TRPCReactProvider>
                  {children}
                </TRPCReactProvider>
              </SessionProvider>
          </body>
      </html>
  );
}
