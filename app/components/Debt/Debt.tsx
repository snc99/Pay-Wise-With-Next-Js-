import React from "react";

export default function Debt() {
  return (
    <main>
      {/* Section Tabel Pencatatan */}
      <section
        className="mx-auto mt-[150px] flex h-screen flex-col rounded-lg bg-blue p-8"
        id="Debt"
      >
        <div className="flex flex-col items-center">
          <h1 className="text-center text-2xl font-bold text-black">
            Tabel Pencatatan
          </h1>
          <span className="mt-2 h-[2px] w-14 bg-black text-black"></span>
        </div>
        <div className="relative mb-6 mt-14 flex w-full flex-col overflow-hidden rounded-lg">
          <div className="overflow-x-auto bg-blue">
            <table className="min-w-full">
              <thead className="bg-blue">
                <tr>
                  <th className="px-6 py-3 text-center text-sm font-bold text-black">
                    Nama
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-center text-sm font-bold text-black"
                  >
                    Total
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-center text-sm font-bold text-black"
                  >
                    Bayar
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-center text-sm font-bold text-black"
                  >
                    Tagihan
                  </th>
                </tr>
              </thead>
              <tbody className="bg-blue">
                <tr className="border-t border-gray-400">
                  <td className="px-6 py-4 text-center text-sm text-black">
                    andre
                  </td>
                  <td className="px-6 py-4 text-center text-sm text-black">
                    10.000
                  </td>
                  <td className="px-6 py-4 text-center text-sm text-black">
                    3000
                  </td>
                  <td className="px-6 py-4 text-center text-sm text-black">
                    7000
                  </td>
                </tr>
                <tr className="border-t border-gray-400">
                  <td className="px-6 py-4 text-center text-sm text-black">
                    sigit
                  </td>
                  <td className="px-6 py-4 text-center text-sm text-black">
                    12.000
                  </td>
                  <td className="px-6 py-4 text-center text-sm text-black">
                    10.000
                  </td>
                  <td className="px-6 py-4 text-center text-sm text-black">
                    2000
                  </td>
                </tr>
                <tr className="border-t border-gray-400">
                  <td className="px-6 py-4 text-center text-sm text-black">
                    rehan
                  </td>
                  <td className="px-6 py-4 text-center text-sm text-black">
                    10.000
                  </td>
                  <td className="px-6 py-4 text-center text-sm text-black">
                    5000
                  </td>
                  <td className="px-6 py-4 text-center text-sm text-black">
                    5000
                  </td>
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
