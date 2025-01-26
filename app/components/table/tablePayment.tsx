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
  // Ambil data pembayaran beserta total hutang dan sisa hutang
  const { payments, totalDebt, totalPayments, remainingDebt } =
    await getPayment(query, currentPage);

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
                <td>Rp {payment.debt.totalDebt.toLocaleString()}</td>
                <td>Rp {payment.amount_paid.toLocaleString()}</td>
                <td>Rp {payment.remaining_amount.toLocaleString()}</td>
                <td>{formatDate(payment.payment_date.toString())}</td>
                <td>
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

      {/* Menampilkan Total Hutang dan Pembayaran */}
      <div className="mt-4">
        <p className="font-bold">
          Total Tagihan: Rp {totalDebt.toLocaleString()}
        </p>
        <p className="font-bold">
          Total Pembayaran: Rp {totalPayments.toLocaleString()}
        </p>
        <p className="font-bold">
          Sisa Hutang: Rp {remainingDebt.toLocaleString()}
        </p>
      </div>
      <div>
        <h1> bug, ketika melakukan satu pencatatan dan banyak pembayaran tidak mengalami masalah. oke oke aja akan tetapi ketika melakukan banyak pencatatan (ini yg jadi masalah) dan banyak pembayaran angka di sisa tagihan tidak sesuai. jadi dia hanya menghitung angka terakhir di pencatatan</h1>
      </div>

      {/* Paginasi */}
    </div>
  );
};

export default TablePayment;

// import React from "react";
// import { getPayment } from "@/lib/dataPayment";
// import { formatDate } from "@/lib/util"; // Utilitas untuk format tanggal
// import { Prisma } from "@prisma/client";

// const TablePayment = async ({
//   query,
//   currentPage,
//   itemsPerPage = 5,
// }: {
//   query: string;
//   currentPage: number;
//   itemsPerPage?: number;
// }) => {
//   // Ambil data pembayaran
//   const payments = await getPayment(query, currentPage, itemsPerPage);

//   // Jika tidak ada pembayaran, tampilkan pesan kosong
//   if (payments.length === 0) {
//     return (
//       <div className="mt-4 text-center">
//         <p className="text-gray-500">Data pembayaran tidak ditemukan.</p>
//       </div>
//     );
//   }

//   // Kalkulasi total tagihan, pembayaran, dan sisa hutang
//   const totalDebt = payments[0]?.debt.totalDebt?.toNumber() || 0;
//   const totalPayments = payments.reduce(
//     (sum, payment) => sum + parseFloat(payment.amount_paid.toString()),
//     0,
//   );
//   const remainingDebt = totalDebt - totalPayments;

//   return (
//     <div>
//       <table className="table w-full">
//         <thead className="text-center">
//           <tr>
//             <th>No</th>
//             <th>Nama</th>
//             <th>Total Tagihan</th>
//             <th>Bayar</th>
//             <th>Sisa Tagihan</th>
//             <th>Tanggal Pembayaran</th>
//             <th>Status</th>
//             <th>Action</th>
//           </tr>
//         </thead>
//         <tbody className="text-center">
//           {payments.map((payment, index) => (
//             <tr
//               key={payment.id}
//               className="hover:bg-gray-100 hover:text-blue-500"
//             >
//               <td>{index + 1}</td>
//               <td>{payment.debt.user.name}</td>
//               <td>Rp {payment.debt.totalDebt.toLocaleString()}</td>
//               <td>Rp {totalPayments.toLocaleString()}</td>
//               <td>Rp {remainingDebt.toLocaleString()}</td>
//               <td>{formatDate(payment.payment_date.toString())}</td>
//               <td>
//                 <span
//                   className={`${
//                     payment.remaining_amount.toNumber() === 0
//                       ? "bg-green-500"
//                       : "bg-red-500"
//                   } rounded-full px-3 py-1 text-white`}
//                 >
//                   {payment.remaining_amount.toNumber() === 0
//                     ? "Lunas"
//                     : "Belum Lunas"}
//                 </span>
//               </td>
//               <td className="flex justify-center gap-1 py-3">
//                 {/* Action buttons */}
//                 {/* <EditPayment id={payment.id} /> */}
//                 {/* <DeletePayment id={payment.id} /> */}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {/* Menampilkan Total Hutang dan Pembayaran */}
//       <div className="mt-4">
//         <p className="font-bold">
//           Total Tagihan: Rp {totalDebt.toLocaleString()}
//         </p>
//         <p className="font-bold">
//           Total Pembayaran: Rp {totalPayments.toLocaleString()}
//         </p>
//         <p className="font-bold">
//           Sisa Hutang: Rp {remainingDebt.toLocaleString()}
//         </p>
//       </div>
//     </div>
//   );
// };

// export default TablePayment;
