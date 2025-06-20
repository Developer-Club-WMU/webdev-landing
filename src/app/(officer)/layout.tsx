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
    <div className="flex min-h-screen w-full min-w-0 flex-col transition-all duration-300 lg:flex-row">
      <AppSideBar />
      <AppTopNav />
      <SessionProvider>
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </SessionProvider>
    </div>
  );
}
