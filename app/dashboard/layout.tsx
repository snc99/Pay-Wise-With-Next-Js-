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
      <div className="flex min-h-screen flex-col">
        <div className="flex flex-1">
          <Sidebar />
          <main className="flex-1 overflow-hidden p-4">
            {" "}
            {/* Tambahkan overflow-hidden */}
            <header className="p-0">
              <Navbar />
            </header>
            <section className="mt-4">{children}</section>
            <Footer />
          </main>
        </div>
      </div>
    </SessionProvider>
  );
};

export default DashboardLayout;
