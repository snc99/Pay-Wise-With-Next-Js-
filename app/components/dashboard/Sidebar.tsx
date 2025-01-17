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
        className="fixed top-4 left-4 z-50 block lg:hidden rounded bg-blue-500 p-2 text-white shadow-md focus:outline-none"
      >
        {isOpen ? "✖" : "☰"}
      </button>

      {/* Sidebar */}
      <aside
        className={`${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } fixed top-0 left-0 z-40 w-64 transform bg-base-200 transition-transform duration-300 lg:static lg:translate-x-0 lg:h-screen h-full min-h-screen flex flex-col`}
      >
        <div className="flex-grow p-4">
          <div className="overflow-x-auto">
            <h2 className="mb-6 text-center text-3xl font-bold">Pay Wise</h2>
            <ul className="menu">
              <Link
                href="/dashboard"
                className={`flex items-center rounded-lg p-2 text-lg text-blue-500 transition duration-200 hover:bg-gray-200 hover:text-grey-700 ${isActive(
                  "/dashboard"
                )}`}
              >
                <FaTachometerAlt className="mr-3" />
                Dashboard
              </Link>
              <hr className="my-2 border-gray-300" />

              <Link
                href="/dashboard/users"
                className={`flex items-center rounded-lg p-2 text-lg transition duration-200 hover:bg-gray-200 hover:text-grey-700 ${isActive(
                  "/dashboard/users"
                )}`}
              >
                <FaUsers className="mr-3" />
                Pengguna
              </Link>
              <hr className="my-2 border-gray-300" />

              <Link
                href="/dashboard/debt"
                className={`flex items-center rounded-lg p-2 text-lg transition duration-200 hover:bg-gray-200 hover:text-grey-700 ${isActive(
                  "/dashboard/debt"
                )}`}
              >
                <FaMoneyBillWave className="mr-3" />
                Daftar Hutang
              </Link>
              <hr className="my-2 border-gray-300" />

              <Link
                href="/dashboard/payment"
                className={`flex items-center rounded-lg p-2 text-lg transition duration-200 hover:bg-gray-200 hover:text-grey-700 ${isActive(
                  "/dashboard/payment"
                )}`}
              >
                <FaCreditCard className="mr-3" />
                Pembayaran
              </Link>
              <hr className="my-2 border-gray-300" />

              <Link
                href="/dashboard/report"
                className={`flex items-center rounded-lg p-2 text-lg transition duration-200 hover:bg-gray-200 hover:text-grey-700 ${isActive(
                  "/dashboard/report"
                )}`}
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
        <div className="p-4 mt-auto">
          <Link
            href="/dashboard/setting"
            className={`flex items-center rounded-lg p-2 text-lg transition duration-200 hover:bg-gray-200 hover:text-grey-700 ${isActive(
              "/dashboard/setting"
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
