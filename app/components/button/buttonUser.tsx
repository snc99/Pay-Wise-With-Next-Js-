"use client";

import Link from "next/link";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { TbTrashXFilled } from "react-icons/tb";
import { PiPencilSimpleLineFill } from "react-icons/pi";
import { useFormStatus } from "react-dom";
import clsx from "clsx";
import { deleteUser } from "@/lib/actionsUser";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

export const CreateUsers = () => {
  return (
    <Link
      href="/dashboard/users/create"
      className="inline-flex items-center space-x-2 rounded-lg bg-blue-400 px-5 py-2 text-sm font-medium text-black transition duration-200 hover:bg-blue-300 hover:text-gray-700 hover:shadow-md"
    >
      <AiOutlineUsergroupAdd size={20} className="text-black" />
      <span>Tambah Pengguna</span>
    </Link>
  );
};

export const EditUsers = ({ id }: { id: string }) => {
  return (
    <Link
      href={`/dashboard/users/edit/${id}`}
      className="rounded-sm border p-1 hover:bg-gray-200 hover:text-black"
    >
      <PiPencilSimpleLineFill size={20} />
    </Link>
  );
};

export const DeleteUsers = ({ id }: { id: string }) => {
  const handleDelete = async (e: React.FormEvent) => {
    e.preventDefault();

    // Konfirmasi dengan SweetAlert sebelum menghapus
    const result = await Swal.fire({
      title: "Apakah Anda yakin?",
      text: "Data ini akan dihapus permanen!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Hapus",
      cancelButtonText: "Batal",
    });

    // Jika pengguna mengonfirmasi penghapusan
    if (result.isConfirmed) {
      const deleteResult = await deleteUser(id);

      if (
        deleteResult &&
        deleteResult.message === "User successfully deleted"
      ) {
        await Swal.fire("Terhapus!", "User berhasil dihapus.", "success");
      } else {
        await Swal.fire("Gagal!", "User masih memiliki hutang.", "error");
      }
    }
  };

  return (
    <form onSubmit={handleDelete}>
      <button
        type="submit"
        className="rounded-sm border p-1 hover:bg-gray-200 hover:text-black"
      >
        <TbTrashXFilled size={20} />
      </button>
    </form>
  );
};

// button submit dan create
export const SubmitButton = ({
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
