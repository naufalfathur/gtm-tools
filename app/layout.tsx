import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import "./globals.css";
import Head from "next/head";

const figtree = Figtree({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GTM Tools - Blogger",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" >
      <body className={figtree.className}>
        {children}
      </body>
    </html>
  );
}