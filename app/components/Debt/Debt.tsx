import React from "react";

export default function Debt() {
  return (
    <main>
      {/* Section Tabel Pencatatan */}
      <section
        className="mx-auto mt-[150px] flex h-screen flex-col rounded-lg bg-base-100 p-8"
        id="Debt"
      >
        <div className="flex flex-col items-center">
          <h1 className="text-center text-2xl font-bold text-black">
            Tabel Pencatatan
          </h1>
          <span className="mt-2 h-[2px] w-14 bg-black text-black"></span>
        </div>
        <div className="relative mb-6 mt-14 flex w-full flex-col overflow-hidden rounded-lg">
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Nama</th>
                  <th>Total Tagihan</th>
                  <th>Bayar</th>
                  <th>Sisa Tagihan</th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-gray-100 hover:text-blue">
                  <td>1</td>
                  <td>John Doe</td>
                  <td>Rp 1.000.000</td>
                  <td>Rp 600.000</td>
                  <td>Rp 400.000</td>
                </tr>
                <tr className="hover:bg-gray-100 hover:text-blue">
                  <td>2</td>
                  <td>Jane Smith</td>
                  <td>Rp 750.000</td>
                  <td>Rp 300.000</td>
                  <td>Rp 450.000</td>
                </tr>
                <tr className="hover:bg-gray-100 hover:text-blue">
                  <td>3</td>
                  <td>Michael Johnson</td>
                  <td>Rp 2.500.000</td>
                  <td>Rp 1.500.000</td>
                  <td>Rp 1.000.000</td>
                </tr>
                <tr className="hover:bg-gray-100 hover:text-blue">
                  <td>4</td>
                  <td>Emily Davis</td>
                  <td>Rp 1.200.000</td>
                  <td>Rp 1.200.000</td>
                  <td>Rp 0</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
      {/* End Section Tabel Pencatatan */}
    </main>
  );
}
