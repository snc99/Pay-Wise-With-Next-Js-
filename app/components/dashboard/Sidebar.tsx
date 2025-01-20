"use client"; // Pastikan file ini dijalankan di sisi klien

import Link from "next/link";
import React, { useState } from "react";
import { usePathname } from "next/navigation"; // Gunakan usePathname
import {
  FaTachometerAlt,
  FaUsers,
  FaMoneyBillWave,
  FaCreditCard,
  FaFileAlt,
  FaCog,
} from "react-icons/fa";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname(); // Mendapatkan path saat ini

  const toggleMenu = () => setIsOpen(!isOpen);

  // Fungsi untuk menentukan apakah link aktif
  const isActive = (path: string) => {
    return pathname === path ? "bg-gray-200 text-blue-500" : ""; // Menyesuaikan kelas jika path aktif
  };

  return (
    <>
      {/* Hamburger Button */}
      <button
        onClick={toggleMenu}
        className="fixed left-4 top-4 z-50 block rounded bg-blue-500 p-2 text-white shadow-md focus:outline-none lg:hidden"
      >
        {isOpen ? "✖" : "☰"}
      </button>

      {/* Sidebar */}
      <aside
        className={`${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } fixed left-0 top-0 z-40 flex h-full min-h-screen w-64 transform flex-col bg-base-200 transition-transform duration-300 lg:static lg:h-screen lg:translate-x-0`}
      >
        <div className="flex-grow p-4">
          <div className="overflow-x-auto">
            <h2 className="mb-6 text-center text-3xl font-bold">Pay Wise</h2>
            <ul className="menu">
              <Link
                href="/dashboard"
                className={`flex items-center rounded-lg p-2 text-lg transition duration-200 ${
                  isActive("/dashboard")
                    ? "bg-gray-200 text-gray-700 hover:bg-gray-200 hover:text-blue-400"
                    : "text-blue-500 hover:bg-gray-200 hover:text-gray-700"
                }`}
              >
                <FaTachometerAlt className="mr-3" />
                Dashboard
              </Link>
              <hr className="my-2 border-gray-300" />

              <Link
                href="/dashboard/users"
                className={`flex items-center rounded-lg p-2 text-lg transition duration-200 ${
                  isActive("/dashboard/users")
                    ? "bg-gray-200 text-gray-700 hover:bg-gray-200 hover:text-blue-400"
                    : "text-blue-500 hover:bg-gray-200 hover:text-gray-700"
                }`}
              >
                <FaUsers className="mr-3" />
                Pengguna
              </Link>
              <hr className="my-2 border-gray-300" />

              <Link
                href="/dashboard/debt"
                className={`flex items-center rounded-lg p-2 text-lg transition duration-200 ${
                  isActive("/dashboard/debt")
                    ? "bg-gray-200 text-gray-700 hover:bg-gray-200 hover:text-blue-400"
                    : "text-blue-500 hover:bg-gray-200 hover:text-gray-700"
                }`}
              >
                <FaMoneyBillWave className="mr-3" />
                Daftar Hutang
              </Link>
              <hr className="my-2 border-gray-300" />

              <Link
                href="/dashboard/payment"
                className={`flex items-center rounded-lg p-2 text-lg transition duration-200 ${
                  isActive("/dashboard/payment")
                    ? "bg-gray-200 text-gray-700 hover:bg-gray-200 hover:text-blue-400"
                    : "text-blue-500 hover:bg-gray-200 hover:text-gray-700"
                }`}
              >
                <FaCreditCard className="mr-3" />
                Pembayaran
              </Link>
              <hr className="my-2 border-gray-300" />

              <Link
                href="/dashboard/report"
                className={`flex items-center rounded-lg p-2 text-lg transition duration-200 ${
                  isActive("/dashboard/report")
                    ? "bg-gray-200 text-gray-700 hover:bg-gray-200 hover:text-blue-400"
                    : "text-blue-500 hover:bg-gray-200 hover:text-gray-700"
                }`}
              >
                <FaFileAlt className="mr-3" />
                Laporan
              </Link>
              <hr className="my-2 border-gray-300" />
            </ul>
          </div>
        </div>

        {/* Divider for separation */}
        <div className="border-t border-gray-300"></div>

        {/* Setting Link at the bottom */}
        <div className="mt-auto p-4">
          <Link
            href="/dashboard/setting"
            className={`hover:text-grey-700 flex items-center rounded-lg p-2 text-lg transition duration-200 hover:bg-gray-200 ${isActive(
              "/dashboard/setting",
            )}`}
          >
            <FaCog className="mr-3" />
            Pengaturan
          </Link>
        </div>
      </aside>

      {/* Overlay for mobile menu */}
      {isOpen && (
        <div
          onClick={toggleMenu}
          className="fixed inset-0 z-30 bg-black opacity-50 lg:hidden"
        ></div>
      )}
    </>
  );
};

export default Sidebar;
