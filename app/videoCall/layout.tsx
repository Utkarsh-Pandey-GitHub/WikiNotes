import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";

import { Stream } from "stream";
import StreamVideoProvider from "@/provider/StreamClientProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-gray-900">
        
          <StreamVideoProvider>
            {children}
          </StreamVideoProvider>
        
      </body>
    </html>
  );
}
