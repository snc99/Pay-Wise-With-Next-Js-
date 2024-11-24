import IconCard1 from "@/public/card/iconCard1";
import IconCard2 from "@/public/card/iconCard2";
import IconCard3 from "@/public/card/iconCard3";
import React from "react";

export default function Services() {
  return (
    <main>
      {/* Start Section Layanan */}
      <section className="container mx-auto mt-[80px] h-screen" id="Services">
        <div className="flex flex-col items-center">
          <h1 className="text-center text-2xl font-bold">Layanan Kami</h1>
          <span className="mt-5 h-[2px] w-14 bg-black"></span>
        </div>
        <div className="mx-auto mt-[40px] flex max-w-screen-lg flex-col items-center">
          <p className="mt-6 text-center text-gery">
            Dengan Pay Wise, Anda dapat mengelola hutang dengan lebih mudah dan
            teratur, menjadikan proses pencatatan keuangan Anda lebih efisien
            dan bebas dari kekacauan. Kami berkomitmen untuk membantu Anda
            menjaga kontrol penuh atas transaksi keuangan, memastikan segala
            sesuatu berjalan lancar dan sesuai rencana.
          </p>
          <div className="mt-12 flex flex-wrap justify-center space-x-8">
            {/*
      <!-- Card 1 -->
      */}
            <div className="h-[320px] w-full rounded-lg bg-card p-4 shadow-md sm:w-[300px]">
              <div className="ml-8 mt-3">
                <IconCard1 />
                <h3 className="mb-2 mt-12 text-xl font-bold">
                  Pencatatan Hutang
                </h3>
                <p className="mt-1 text-gray-500">
                  Kami memudahkan Anda mencatat setiap transaksi hutang dengan
                  cepat dan akurat.
                </p>
              </div>
            </div>

            {/*
      <!-- Card 2 -->
      */}
            <div className="h-[320px] w-full rounded-lg bg-card p-4 shadow-md sm:w-[300px]">
              <div className="ml-[30px] mt-3">
                <IconCard2 />
                <h3 className="mb-2 mt-[50px] text-xl font-bold">
                  Ringkasan Total Hutang
                </h3>
                <p className="mt-5 text-gery">
                  Pantau jumlah total hutang yang belum dilunasi dalam satu
                  tampilan yang mudah dipahami.
                </p>
              </div>
            </div>
            {/*
      <!-- Card 3 -->
      */}
            <div className="h-[320px] w-full rounded-lg bg-card p-4 shadow-md sm:w-[300px]">
              <div className="ml-[30px] mt-3">
                <IconCard3 />
                <h3 className="mb-2 mt-[50px] text-xl font-bold">
                  Laporan Keuangan{" "}
                </h3>
                <p className="mt-5 text-gery">
                  Dapatkan laporan ringkas tentang status hutang dan pembayaran
                  dengan mudah.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* End Section Layanan */}
    </main>
  );
}
