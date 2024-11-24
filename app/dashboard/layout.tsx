import React from "react";
import Navbar from "../components/dashboard/Navbar";
import Sidebar from "../components/dashboard/Sidebar";
import Footer from "../components/dashboard/Footer";

const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-4">
        <header className="p-4">
          <Navbar />
        </header>
        <section className="mt-4">{children}</section>
        <Footer />
      </main>
    </div>
  );
};

export default DashboardLayout;
