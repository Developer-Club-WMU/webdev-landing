import "@/styles/globals.css";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "WebDev Landing",
  description: "Built with T3 Stack",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
