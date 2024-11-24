import IconCard4 from "@/public/card/iconCard4";
import IconCard5 from "@/public/card/iconCard5";
import IconCard6 from "@/public/card/iconCard6";
import React from "react";

export default function Contact() {
  return (
    <main>
      {/* Section Kontak */}
      <section className="container mx-auto mt-[80px] h-screen" id="Contact">
        <div className="flex flex-col items-center">
          <h1 className="text-center text-2xl font-bold">Kontak Kami</h1>
          <span className="mt-2 h-[2px] w-14 bg-black"></span>
        </div>
        <div className="mx-auto mt-[40px] flex max-w-screen-lg flex-col items-center">
          <div className="mt-[150px] flex space-x-[50px]">
            {/*
      <!-- Card 1 -->
      */}
            <div className="h-[190px] w-[355px] rounded-lg bg-card p-4 shadow-md">
              <div className="ml-[30px] mt-3 flex items-start">
                <IconCard4 />
                <div className="ml-4">
                  <h3 className="mb-2 text-xl font-bold">Alamat</h3>
                  <p className="mt-1 text-gray-700">Jl. Sagong RT 02 RW 06</p>
                </div>
              </div>
            </div>
            {/*
      <!-- Card 2 -->
      */}
            <div className="h-[190px] w-[355px] rounded-lg bg-card p-4 shadow-md">
              <div className="ml-[30px] mt-3 flex items-start">
                <IconCard5 />
                <div className="ml-4">
                  <h3 className="mb-2 text-xl font-bold">Telepon</h3>
                  <p className="mt-1 text-gray-700">08764523445</p>
                </div>
              </div>
            </div>
            {/*
      <!-- Card 3 -->
      */}
            <div className="h-[190px] w-[355px] rounded-lg bg-card p-4 shadow-md">
              <div className="ml-[30px] mt-3 flex items-start">
                <IconCard6 />
                <div className="ml-4">
                  <h3 className="mb-2 text-xl font-bold">Alamat</h3>
                  <p className="mt-1 text-gray-700">Paywise@gmail.co.id</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* End Section Kontak */}
    </main>
  );
}
