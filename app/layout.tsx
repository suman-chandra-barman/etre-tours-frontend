import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import { UserProvider } from "@/contexts/UserContext";
import Sidebar from "@/components/shared/Sidebar";
import Header from "@/components/shared/Header";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ETRE Tours",
  description: "ETRE Tours application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${nunito.variable} font-sans antialiased`}
        suppressHydrationWarning={true}
      >
        <UserProvider>
          <div className="flex h-screen bg-gray-50">
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
              <Header />
              {children}
            </div>
          </div>
        </UserProvider>
      </body>
    </html>
  );
}
