import type { Metadata } from "next";
import { Inter, Mulish } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const mulish = Mulish({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pay Wise",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={mulish.className}>{children}</body>
    </html>
  );
}
