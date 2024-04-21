'use client'

import { Inter } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { SaveProvider } from "@/app/context/SaveContext";

const inter = Inter({ subsets: ["latin"] });

// export const metadata = {
//   title: "PokéWire Re-Imagined",
//   description: "Generated by create next app",
// };

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} h-full`}>
        <SessionProvider>
          <SaveProvider>
            {children}
          </SaveProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
