import React from "react";

export default function Footer() {
  return (
    <main>
      {/* Section Footer */}
      <section className="mx-auto mt-[80px] h-1/2 w-full rounded-lg bg-blue">
        <div className="flex h-full items-center justify-between px-8">
          <div className="flex-1 text-xl text-white">
            <div className="flex items-center">
              <div className="rounded-full bg-white p-2">
                <svg
                  className="text-blue-500 h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 0C4.477 0 0 4.477 0 10s4.477 10 10 10 10-4.477 10-10S15.523 0 10 0zm0 18a8 8 0 110-16 8 8 0 010 16zm-1-9V5a1 1 0 112 0v4h3a1 1 0 110 2h-3v4a1 1 0 11-2 0v-4H6a1 1 0 110-2h3z" />
                </svg>
              </div>
              <div className="ml-4">
                <h2 className="text-lg font-bold">Pay Wise</h2>
                <p>Kelola catatan hutang dan piutang dengan</p>
                <p> praktis dan teratur.</p>
                <p>Download Apps to get started.</p>
              </div>
            </div>
          </div>
          <div className="mb-6 mt-6 flex-1 text-xl text-white">
            <h1 className="mb-2 font-bold">Company</h1>
            <p>Home</p>
            <p>Layanan</p>
            <p>About Us</p>
            <p>Pencatatan</p>
            <p>Kontak Kami</p>
          </div>
        </div>
      </section>
      {/* End section footer */}
    </main>
  );
}
