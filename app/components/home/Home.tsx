import React from "react";
import BgHeader from "@/public/Backgroud/bg-Header";

export default function Home() {
  return (
    <main>
      {/* Start Section Home */}
      <section
        className="container mx-auto flex h-screen flex-col items-center justify-center pt-[58px] md:flex-row"
        id="Home"
      >
        <div className="max-w-lg text-left md:w-1/2">
          <h1 className="text-[40px] font-bold">
            <span className="text-blue-new">Pay Wise </span>- Manajemen Hutang
            Anda Jadi Mudah!
          </h1>
          <p className="mt-6 text-gery">
            Kelola catatan hutang dan piutang dengan praktis dan teratur. Dengan
            Pay Wise, Anda bisa mencatat transaksi dan memantau status keuangan
            secara efisien.
          </p>
        </div>
        <div className="flex h-[600px] w-[900px] items-center justify-center md:h-1/2">
          <BgHeader />
        </div>
      </section>
      {/* End Section Home */}
    </main>
  );
}
