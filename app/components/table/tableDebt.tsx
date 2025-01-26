import React from "react";
import { getDebt } from "@/lib/dataDebt";
import { formatDate } from "@/lib/util";
import { DeleteDebt } from "../button/buttonDebt";

const TableDebt = async ({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) => {
  const debts = await getDebt(query, currentPage);
  return (
    <div>
      <table className="table w-full">
        <thead className="text-center">
          <tr>
            <th>No</th>
            <th>Nama</th>
            <th>Tanggal Berhutang</th>
            <th>Jumlah Hutang</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {debts.length === 0 ? (
            <tr>
              <td colSpan={5} className="mb-2 text-center">
                Data tagihan tidak ditemukan
              </td>
            </tr>
          ) : (
            debts.map((debt, index) => (
              <tr
                key={debt.id}
                className="hover:bg-gray-100 hover:text-blue-500"
              >
                <td>{index + 1}</td>
                <td>{debt.user.name}</td>
                <td>{formatDate(debt.createdAt.toString())}</td>
                <td>Rp {debt.totalDebt.toLocaleString()}</td>
                {/* <td>
                  {parseFloat(debt.amount.toString()).toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  })}
                </td> */}
                <td className="flex justify-center gap-1 py-3">
                  <DeleteDebt id={debt.id} />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TableDebt;
