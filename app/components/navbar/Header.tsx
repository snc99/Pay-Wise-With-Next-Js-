"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MdOutlineLogin } from "react-icons/md";
import ThemeToggle from "@/app/components/button/themeToggle";


export default function Header() {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState("");

  const handleScroll = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const sections = document.querySelectorAll("section");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    });

    sections.forEach((section) => {
      observer.observe(section);
    });

    return () => {
      sections.forEach((section) => {
        observer.unobserve(section);
      });
    };
  }, []);

  return (
    <main>
      <header className="z-1 container fixed inset-0 mx-auto flex h-[58px] items-center justify-between">
        <div className="text-xl font-bold">Pay Wise</div>
        <nav>
          <ul className="flex items-center justify-center gap-4">
            <li>
              <Link
                href="#Home"
                onClick={() => handleScroll("Home")}
                className={activeSection === "Home" ? "active" : ""}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="#About"
                onClick={() => handleScroll("About")}
                className={activeSection === "About" ? "active" : ""}
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                href="#Debt"
                onClick={() => handleScroll("Debt")}
                className={activeSection === "Debt" ? "active" : ""}
              >
                Pencatatan
              </Link>
            </li>
            <li>
              <Link
                href="#Services"
                onClick={() => handleScroll("Services")}
                className={activeSection === "Services" ? "active" : ""}
              >
                Layanan
              </Link>
            </li>
            <li>
              <Link
                href="#Contact"
                onClick={() => handleScroll("Contact")}
                className={activeSection === "Contact" ? "active" : ""}
              >
                Kontak
              </Link>
            </li>
            <button
              className="button-login"
              onClick={() => router.push("/auth/login")}
            >
              <span className="flex items-center">
                Login <MdOutlineLogin size={20} />
              </span>
            </button>
                  <ThemeToggle />
          </ul>
        </nav>
      </header>
    </main>
  );
}
