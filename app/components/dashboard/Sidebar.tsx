import React from "react";
import { FaTachometerAlt, FaCog, FaUser } from "react-icons/fa";

export default function Sidebar() {
  return (
    <>
      <aside className="bg-base-200 h-screen w-64 shadow-lg">
        <div className="p-4">
          <h2 className="mb-6 text-center text-2xl font-bold">Pay Wise</h2>
          <ul className="menu">
            <li className="mb-2">
              <a
                href="#"
                className="hover:bg-blue-500 flex items-center rounded-lg p-2 text-base text-gray-700 transition duration-200 hover:text-white"
              >
                <FaTachometerAlt className="mr-3" />
                Dashboard
              </a>
            </li>
            <li className="mb-2">
              <a
                href="#"
                className="hover:bg-blue-500 flex items-center rounded-lg p-2 text-base text-gray-700 transition duration-200 hover:text-white"
              >
                <FaCog className="mr-3" />
                Pengaturan
              </a>
            </li>
            <li className="mb-2">
              <a
                href="#"
                className="hover:bg-blue-500 flex items-center rounded-lg p-2 text-base text-gray-700 transition duration-200 hover:text-white"
              >
                <FaUser className="mr-3" />
                Profil
              </a>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
}
