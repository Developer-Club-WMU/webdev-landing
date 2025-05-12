import AppSideBar from "@/features/shared/AppSideBar/AppSideBar";
import AppTopNav from "@/features/shared/AppTopNav/TopNav/AppTopNav";
import { TRPCReactProvider } from "@/trpc/react";
import { SessionProvider } from "next-auth/react";

export default function OfficerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex min-h-screen w-full min-w-0 flex-col overflow-hidden transition-all duration-300 lg:flex-row">
        <AppSideBar />
        <div className="flex min-w-0 flex-grow flex-col overflow-x-auto overflow-y-auto">
          <AppTopNav />
          <main className="min-w-0 flex-grow">
            <SessionProvider>
              <TRPCReactProvider>{children}</TRPCReactProvider>
            </SessionProvider>
          </main>
        </div>
      </body>
    </html>
  );
}
