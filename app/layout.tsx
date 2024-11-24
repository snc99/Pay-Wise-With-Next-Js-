"use client";

import type { Metadata } from "next";
import { Inter, Mulish } from "next/font/google";
import Header from "./components/navbar/Header";
import Footer from "./components/footer/Footer";
import { usePathname } from "next/navigation";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const mulish = Mulish({ subsets: ["latin"] });
const disableNavbar = ["/auth/login", "/dashboard"];
const disableFooter = ["/auth/login", "/dashboard"];

// export const metadata: Metadata = {
//   title: "Pay Wise",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  return (
    <html lang="en">
      <head>{/* link meta data  */}</head>
      <body className={mulish.className}>
        {/* Render Header jika bukan di halaman login */}
        {!disableNavbar.includes(pathname) && <Header />}

        {/* Konten utama */}
        {children}

        {/* Render Footer jika bukan di halaman login */}
        {!disableFooter.includes(pathname) && <Footer />}
      </body>
    </html>
  );
}
