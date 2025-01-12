"use client";

import React from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import ThemeToggle from "@/app/components/button/themeToggle";

const Navbar = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut({ redirect: false }); // Mencegah pengalihan otomatis
    router.push("/auth/login");
  };

  return (
  <div className="navbar container mx-auto px-6">
    <div className="flex-1 bg">
      <a className="btn btn-ghost text-xl">
        Hi
        {status === "loading"
          ? " " + "Loading..."
          : session
          ? " " + session.user.name
          : " " + "No Session"}
      </a>
    </div>
    <div className="flex-none gap-2">
      <ThemeToggle />
      <div className="dropdown dropdown-end">
        <div
          tabIndex={0}
          role="button"
          className="avatar btn btn-circle btn-ghost"
        >
          <div className="w-10 rounded-full">
            <img
              alt="User Avatar"
              src={
                session?.user?.image ||
                "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              }
            />
          </div>
        </div>
        <ul
          tabIndex={0}
          className="menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box bg-base-100 p-2 shadow"
        >
          <li>
            <a className="justify-between text-gray-700 transition duration-200 hover:bg-gray-200 hover:text-blue">
              Profile
            </a>
          </li>
          <li>
            <a className="justify-between text-gray-700 transition duration-200 hover:bg-gray-200 hover:text-blue">
              Settings
            </a>
          </li>
          <li>
            <a
              className="justify-between text-gray-700 transition duration-200 hover:bg-gray-200 hover:text-blue"
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
