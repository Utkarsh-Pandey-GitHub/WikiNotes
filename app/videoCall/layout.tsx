import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";

import { Stream } from "stream";
import StreamVideoProvider from "@/provider/StreamClientProvider";
import videoCallBg from "@/public/videoCallBg.jpg"


const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-slate-900" >
        
          <StreamVideoProvider>
            {children}
          </StreamVideoProvider>
        
      </body>
    </html>
  );
}
