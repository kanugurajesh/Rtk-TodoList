import type { Metadata } from "next";
import { Inter } from "next/font/google";
import StoreProvider from "../components/StoreProvider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Increment Decrement",
  description: "Increment Decrement using RTK",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StoreProvider count={0}>
      <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
    </StoreProvider>
  );
}
