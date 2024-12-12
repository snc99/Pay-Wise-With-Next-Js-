import React from "react";

export default function Footer() {
  return (
    <main>
      <footer className="footer footer-center w-full bg-base-200 p-4 text-base-content">
        <aside>
          <p>
            Copyright © {new Date().getFullYear()} - All right reserved by
            Irvan Sandy
          </p>
        </aside>
      </footer>
    </main>
  );
}
