"use client";

import Link from "next/link";
import { TbTrashXFilled } from "react-icons/tb";
import clsx from "clsx";
import { deleteDebt } from "@/lib/actionsDebt";
import Swal from "sweetalert2";
import { FaSackDollar } from "react-icons/fa6";

export const CreateDebt = () => {
  return (
    <Link
      href="/dashboard/debt/create"
      className="inline-flex items-center space-x-2 rounded-lg bg-blue-400 px-5 py-2 text-sm font-medium text-black transition duration-200 hover:bg-blue-300 hover:text-gray-700 hover:shadow-md"
    >
      <FaSackDollar size={20} className="text-black" />
      <span>Tambah Tagihan</span>
    </Link>
  );
};

export const SubmitButtonAmount = ({
  label,
  pending,
}: {
  label: string;
  pending: boolean;
}) => {
  const className = clsx(
    "flex items-center px-4 py-1 text-white bg-blue-600 rounded-md shadow-md hover:bg-blue-700 transition duration-300",
    {
      "opacity-50 cursor-progress": pending,
    },
  );

  return (
    <button type="submit" className={className} disabled={pending}>
      {pending ? (
        <>
          <svg
            className="mr-2 h-4 w-4 animate-spin"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
              strokeDasharray="80"
              strokeDashoffset="60"
              fill="none"
            ></circle>
          </svg>
          <span>Loading...</span>
        </>
      ) : (
        <>
          <svg
            className="mr-2 h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            ></path>
          </svg>
          <span>{label === "save" ? "Save" : "Update"}</span>
        </>
      )}
    </button>
  );
};

export const DeleteDebt = ({ id }: { id: string }) => {
  const handleDelete = async () => {
    const result = await Swal.fire({
      title: "Apakah Anda yakin?",
      text: "Data ini akan dihapus permanen!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Hapus",
      cancelButtonText: "Batal",
    });

    if (result.isConfirmed) {
      const deleteResult = await deleteDebt(id);

      if (deleteResult?.message === "Debt successfully deleted") {
        await Swal.fire("Terhapus!", "Hutang berhasil dihapus.", "success");
      } else {
        await Swal.fire("Gagal!", "Gagal menghapus hutang.", "error");
      }
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="rounded-sm border p-1 hover:bg-gray-200 hover:text-black"
    >
      <TbTrashXFilled size={20} />
    </button>
  );
};
