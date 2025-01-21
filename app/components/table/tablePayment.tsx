import React from "react";
import { getPayment } from "@/lib/dataPayment";
import { formatDate } from "@/lib/util"; // Format tanggal

const TablePayment = async ({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) => {
  // Ambil data pembayaran
  const { payments } = await getPayment(query, currentPage);

  return (
    <div>
      <table className="table w-full">
        <thead className="text-center">
          <tr>
            <th>No</th>
            <th>Nama</th>
            <th>Total Tagihan</th>
            <th>Bayar</th>
            <th>Sisa Tagihan</th>
            <th>Tanggal Pembayaran</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {payments.length === 0 ? (
            <tr>
              <td colSpan={8} className="mb-2 text-center">
                Data Pembayaran tidak ditemukan
              </td>
            </tr>
          ) : (
            payments.map((payment, index) => (
              <tr
                key={payment.id}
                className="hover:bg-gray-100 hover:text-blue-500"
              >
                <td>{index + 1}</td>
                <td>{payment.debt.user.name}</td>
                <td>Rp {payment.debt.amount.toLocaleString()}</td>
                <td>Rp {payment.amount_paid.toLocaleString()}</td>
                <td>Rp {payment.remaining_amount.toLocaleString()}</td>
                <td>{formatDate(payment.payment_date.toString())}</td>
                <td>
                  {/* Status dengan background hijau untuk Lunas dan merah untuk Belum Lunas */}
                  <span
                    className={`${
                      payment.remaining_amount.toNumber() === 0
                        ? "bg-green-500"
                        : "bg-red-500"
                    } rounded-full px-3 py-1 text-white`}
                  >
                    {payment.remaining_amount.toNumber() === 0
                      ? "Lunas"
                      : "Belum Lunas"}
                  </span>
                </td>
                <td className="flex justify-center gap-1 py-3">
                  {/* Action buttons */}
                  {/* <EditPayment id={payment.id} />
                  <DeletePayment id={payment.id} /> */}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TablePayment;
