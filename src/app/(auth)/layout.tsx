import "@/styles/globals.css";

export default function OfficerLayout({ children }: { children: React.ReactNode }) {
  return (
      <html lang="en" >
          <body className="min-h-screen flex flex-col min-w-0 lg:flex-row w-full transition-all duration-300">
              {children}
          </body>
      </html>
  );
}
