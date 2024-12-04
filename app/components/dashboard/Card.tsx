import React from "react";

export default function Card() {
  return (
    <>
      <div className="mb-7 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Kartu 1</h2>
            <p>Beberapa konten di sini...</p>
          </div>
        </div>
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Kartu 2</h2>
            <p>Beberapa konten di sini...</p>
          </div>
        </div>
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Kartu 3</h2>
            <p>Beberapa konten di sini...</p>
          </div>
        </div>
      </div>
      <div className="card mb-5 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Daftar Pencatatan Hutang</h2>
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
      </div>
    </>
  );
}
