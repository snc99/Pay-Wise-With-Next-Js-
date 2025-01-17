"use client";

import React from "react";
import Navbar from "../components/dashboard/Navbar";
import Sidebar from "../components/dashboard/Sidebar";
import Footer from "../components/dashboard/Footer";
import { SessionProvider } from "next-auth/react";
import { ToastProvider } from "../components/sweetalert/Toast";
import AutoLogout from "../components/session/AutoLogout";

const DashboardLayout: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <SessionProvider>
      <ToastProvider>
      <AutoLogout />
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
      <AutoLogout />
      </ToastProvider>
    </SessionProvider>
  );
};

export default DashboardLayout;
