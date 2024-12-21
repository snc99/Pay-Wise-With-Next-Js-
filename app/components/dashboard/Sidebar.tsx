import React from "react";
import Link from "next/link";
import {
  FaTachometerAlt,
  FaUsers,
  FaMoneyBillWave,
  FaCreditCard,
  FaFileAlt,
  FaCog,
} from "react-icons/fa";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const currentPath = usePathname();

  const isActive = (path: string) => {
    return currentPath === path ? "text-blue-500 bg-red-500" : "text-gray-700";
  };

  return (
    <aside className="flex h-screen w-64 flex-col bg-base-200 shadow-lg">
      <div className="flex-grow p-4">
        <h2 className="mb-6 text-center text-3xl font-bold">Pay Wise</h2>
        <ul className="menu">
          <Link
            href="/dashboard"
            className={`flex items-center rounded-lg p-2 text-lg transition duration-200 hover:bg-gray-200 ${isActive("/dashboard")}`}
          >
            <FaTachometerAlt className="mr-3" />
            Dashboard
          </Link>
          <hr className="my-2 border-gray-300" />

          <Link
            href="/dashboard/users"
            className={`flex items-center rounded-lg p-2 text-lg transition duration-200 hover:bg-gray-200 ${isActive("/dashboard/users")}`}
          >
            <FaUsers className="mr-3" />
            Pengguna
          </Link>
          <hr className="my-2 border-gray-300" />

          <Link
            href="/dashboard/debt"
            className={`flex items-center rounded-lg p-2 text-lg transition duration-200 hover:bg-gray-200 ${isActive("/dashboard/debt")}`}
          >
            <FaMoneyBillWave className="mr-3" />
            Hutang
          </Link>
          <hr className="my-2 border-gray-300" />

          <Link
            href="/dashboard/payment"
            className={`flex items-center rounded-lg p-2 text-lg transition duration-200 hover:bg-gray-200 ${isActive("/dashboard/payment")}`}
          >
            <FaCreditCard className="mr-3" />
            Pembayaran
          </Link>
          <hr className="my-2 border-gray-300" />

          <Link
            href="/dashboard/report"
            className={`flex items-center rounded-lg p-2 text-lg transition duration-200 hover:bg-gray-200 ${isActive("/dashboard/report")}`}
          >
            <FaFileAlt className="mr-3" />
            Laporan
          </Link>
          <hr className="my-2 border-gray-300" />
        </ul>
      </div>
      {/* Item Pengaturan di bagian paling bawah */}
      <div className="mt-auto p-4">
        <Link
          href="/dashboard/setting"
          className={`flex items-center rounded-lg p-2 text-lg transition duration-200 hover:bg-gray-200 ${isActive("/dashboard/setting")}`}
        >
          <FaCog className="mr-3" />
          Pengaturan
        </Link>
      </div>
    </aside>
  );
}
