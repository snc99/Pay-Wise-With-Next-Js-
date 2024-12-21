import React from "react";

export default function Footer() {
  return (
    <main>
      {/* Section Footer */}
      <footer className="footer footer-center bg-blue p-4 text-base-content">
        <aside>
          <p>
            Copyright © {new Date().getFullYear()} - All right reserved by
            Irvan Sandy
          </p>
        </aside>
      </footer>
      {/* End section footer */}
    </main>
  );
}
