"use client";

import { useState, useEffect } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<string | null>(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute("data-theme", savedTheme);
    } else {
      const userPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      if (userPrefersDark) {
        setTheme("dark");
        document.documentElement.setAttribute("data-theme", "dark");
      } else {
        setTheme("light");
        document.documentElement.setAttribute("data-theme", "light");
      }
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "retro" ? "dark" : theme === "dark" ? "light" : "retro";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <label className="swap swap-rotate">
      {/* Tombol Sakelar */}
      <input type="checkbox" onChange={toggleTheme} />
      <div className="swap-on">
        <span className="icon">🌞</span> {/* Ikon Light Mode */}
      </div>
      <div className="swap-off">
        <span className="icon">🌙</span> {/* Ikon Dark Mode */}
      </div>
    </label>
  );
}
