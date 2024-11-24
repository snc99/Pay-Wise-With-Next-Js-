import BgAbout1 from "@/public/Backgroud/bg-About1";
import BgAbout2 from "@/public/Backgroud/bg-About2";
import React from "react";

export default function About() {
  return (
    <main>
      {/* Section About Us */}
      <section className="container mx-auto" id="About">
        <div className="flex flex-col items-center">
          <h1 className="text-center text-2xl font-bold">About Us</h1>
          <span className="mt-5 h-[2px] w-14 bg-black"></span>
        </div>
        {/* Section About 1 */}
        <div className="flex flex-col items-center justify-center md:flex-row">
          <div className="flex w-[900px] items-center md:h-1/2">
            <BgAbout1 />
          </div>
          <div className="ml-[68px] max-w-lg text-left md:w-1/2">
            <h1 className="text-[28px] font-bold">
              Kelola semua hutang Anda dengan mudah menggunakan fitur di Pay
              Wise.
            </h1>
            <p className="mt-6 text-gery">
              Pay Wise kami dirancang untuk memberikan Anda kendali penuh atas
              keuangan Anda dengan cara yang sederhana dan terstruktur.
              Tingkatkan efisiensi pengelolaan keuangan Anda dan hindari
              keterlambatan pembayaran dengan alat pencatatan yang canggih dan
              intuitif.
            </p>
          </div>
        </div>
        {/* End Section About 1 */} {/* Section About 2 */}
        <div className="flex flex-col items-center justify-center md:flex-row">
          <div className="ml-[68px] max-w-lg text-left md:w-1/2">
            <h1 className="text-[28px] font-bold">
              Pantau dan Kelola Hutang Anda Secara Real-Time
            </h1>
            <p className="mt-6 text-gery">
              Kelola semua hutang Anda dengan mudah menggunakan fitur Pencatatan
              Hutang di Pay Wise. Catat setiap transaksi, lacak total hutang,
              dan lihat ringkasan secara real-time. Akses informasi kapan saja
              melalui platform online kami, sehingga Anda selalu terinformasi
              dan dapat mencegah keterlambatan pembayaran.
            </p>
          </div>
          <div className="ml-7 md:h-1/2">
            <BgAbout2 />
          </div>
        </div>
        {/* End Section About 2 */}
      </section>
      {/* End Section About*/}
    </main>
  );
}
