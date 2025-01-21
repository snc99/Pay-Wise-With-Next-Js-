import React from "react";
import { getUsers } from "@/lib/dataUser";
import { formatDate } from "@/lib/util";
import { EditUsers, DeleteUsers } from "../button/buttonUser";

const TableUser = async ({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) => {
  const users = await getUsers(query, currentPage);
  return (
    <div>
      <table className="table w-full">
        <thead className="text-center">
          <tr>
            <th>No</th>
            <th>Nama</th>
            <th>Phone</th>
            <th>Tanggal</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {users.length === 0 ? (
            <tr>
              <td colSpan={5} className="mb-2 text-center">
                Data Pengguna tidak ditemukan
              </td>
            </tr>
          ) : (
            users.map((user, index) => (
              <tr
                key={user.id}
                className="hover:bg-gray-100 hover:text-blue-500"
              >
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.phone}</td>
                <td>{formatDate(user.createdAt.toString())}</td>
                <td className="flex justify-center gap-1 py-3">
                  <EditUsers id={user.id} />
                  <DeleteUsers id={user.id} />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TableUser;
