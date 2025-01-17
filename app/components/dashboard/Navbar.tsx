"use client";

import React from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import ThemeToggle from "@/app/components/button/themeToggle";
import { FaUserCircle } from "react-icons/fa";
import Image from "next/image";

const Navbar = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut({ redirect: false }); // Mencegah pengalihan otomatis
    router.push("/auth/login");
  };

  return (
    <div className="card m-5 flex flex-col items-center rounded-md bg-base-200 p-2 md:flex-row">
      <div className="flex-1 text-lg font-semibold">
        {status === "loading" && "Loading Session..."}
        {status === "authenticated" && `Hi ${session?.user?.name}`}
        {status === "unauthenticated" && "Tidak ada session"}
      </div>
      <div className="mt-3 flex flex-none items-center gap-2 md:mt-0">
        <ThemeToggle />
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-circle btn-ghost">
            <div className="flex h-10 w-10 items-center justify-center">
              {session?.user?.image ? (
                <Image
                  alt="User Avatar"
                  src={session.user.image}
                  className="h-10 w-10 rounded-full"
                />
              ) : (
                <FaUserCircle className="h-full w-full text-gray-400" />
              )}
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-md bg-base-300 p-2 shadow"
          >
            <li>
              <a className="hover:text-blue justify-between rounded-md text-gray-700 transition duration-200 hover:bg-blue-200">
                Profile
              </a>
            </li>
            <li>
              <a className="hover:text-blue justify-between rounded-md text-gray-700 transition duration-200 hover:bg-blue-200">
                Settings
              </a>
            </li>
            <li>
              <a
                className="hover:text-blue justify-between rounded-md text-gray-700 transition duration-200 hover:bg-blue-200"
                href="#"
                onClick={handleLogout}
              >
                Logout
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
