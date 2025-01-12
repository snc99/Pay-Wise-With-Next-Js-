import React from "react";

export default function Footer() {
  return (
    <main>
      {/* <footer className="footer footer-center bg-base-200 p-4 text-base-content"> */}
        <aside>
          <p  className="text-center text-sm mb-2">
            Copyright © {new Date().getFullYear()} - All right reserved by
            Irvan Sandy
          </p>
        </aside>
      {/* </footer> */}
    </main>
  );
}
