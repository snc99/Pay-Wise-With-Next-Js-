import React from "react";
import {
  FaTachometerAlt,
  FaUsers,
  FaMoneyBillWave,
  FaCreditCard,
  FaFileAlt,
  FaCog,
} from "react-icons/fa";

export default function Sidebar() {
  return (
    <aside className="flex h-screen w-64 flex-col bg-base-200 shadow-lg">
      <div className="flex-grow p-4">
        <h2 className="mb-6 text-center text-3xl font-bold">Pay Wise</h2>
        <ul className="menu">
          <div className="mt-auto">
            <a
              href="#"
              className="flex items-center rounded-lg p-2 text-lg text-gray-700 transition duration-200 hover:bg-gray-200 hover:text-blue"
            >
              <FaTachometerAlt className="mr-3" />
              Dashboard
            </a>
            <hr className="my-2 border-gray-300 transition duration-200 hover:bg-blue" />
          </div>
          <div className="mt-auto">
            <a
              href="#"
              className="flex items-center rounded-lg p-2 text-lg text-gray-700 transition duration-200 hover:bg-gray-200 hover:text-blue"
            >
              <FaUsers className="mr-3" />
              Pengguna
            </a>
            <hr className="my-2 border-gray-300 transition duration-200 hover:bg-blue" />
          </div>
          <div className="mt-auto">
            <a
              href="#"
              className="flex items-center rounded-lg p-2 text-lg text-gray-700 transition duration-200 hover:bg-gray-200 hover:text-blue"
            >
              <FaMoneyBillWave className="mr-3" />
              Hutang
            </a>
            <hr className="my-2 border-gray-300 transition duration-200 hover:bg-blue" />
          </div>
          <div className="mt-auto">
            <a
              href="#"
              className="flex items-center rounded-lg p-2 text-lg text-gray-700 transition duration-200 hover:bg-gray-200 hover:text-blue"
            >
              <FaCreditCard className="mr-3" />
              Pembayaran
            </a>
            <hr className="my-2 border-gray-300 transition duration-200 hover:bg-blue" />
          </div>
          <div className="mt-auto">
            <a
              href="#"
              className="flex items-center rounded-lg p-2 text-lg text-gray-700 transition duration-200 hover:bg-gray-200 hover:text-blue"
            >
              <FaFileAlt className="mr-3" />
              Laporan
            </a>
            <hr className="my-2 border-gray-300 transition duration-200 hover:bg-blue" />
          </div>
        </ul>
      </div>
      {/* Item Pengaturan di bagian paling bawah */}
      <div className="p-4">
        <a
          href="#"
          className="flex items-center rounded-lg p-2 text-lg text-gray-700 transition duration-200 hover:bg-gray-200 hover:text-blue"
        >
          <FaCog className="mr-3" />
          Pengaturan
        </a>
      </div>
    </aside>
  );
}
