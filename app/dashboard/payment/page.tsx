import React from "react";

export default function PaymentPage() {
  return (
    <div>
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
  );
}
