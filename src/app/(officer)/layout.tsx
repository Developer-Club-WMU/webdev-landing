import AppSideBar from "@/features/shared/AppSideBar/AppSideBar";
import AppTopNav from "@/features/shared/AppTopNav/TopNav/AppTopNav";
import "@/styles/globals.css";
import { TRPCReactProvider } from "@/trpc/react";
import { SessionProvider } from "next-auth/react";

export default function OfficerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="flex h-screen w-full min-w-0 flex-col overflow-hidden lg:flex-row">
        <SessionProvider>
          <AppSideBar />

          {/* Main Content Area */}
          <div className="flex min-w-0 flex-grow flex-col overflow-hidden">
            <AppTopNav />
            {/* Scrollable main area */}
            <main className="flex-grow overflow-auto px-4 py-6">
                <TRPCReactProvider>{children}</TRPCReactProvider>
            </main>
          </div>
        </SessionProvider>
      </body>
    </html>
  );
}
