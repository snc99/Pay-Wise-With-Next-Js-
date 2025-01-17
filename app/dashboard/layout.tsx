"use client";

import React from "react";
import Navbar from "../components/dashboard/Navbar";
import Sidebar from "../components/dashboard/Sidebar";
import Footer from "../components/dashboard/Footer";
import { SessionProvider } from "next-auth/react";

const DashboardLayout: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <SessionProvider>
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex flex-1 flex-col">
          <header>
            <Navbar />
          </header>
          <main className="flex-1 overflow-hidden p-4">{children}</main>
          <footer>
            <Footer />
          </footer>
        </div>
      </div>
    </SessionProvider>
  );
};

export default DashboardLayout;
