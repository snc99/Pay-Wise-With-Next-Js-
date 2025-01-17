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
      // Menjalankan penghapusan
      const deleteResult = await deleteUser(id);

      // Pastikan deleteResult memiliki message sebelum mengaksesnya
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
export const SubmitButton = ({ label }: { label: string }) => {
  const { pending } = useFormStatus();

  const className = clsx(
    "flex items-center rounded-md px-4 py-1 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none shadow-md transition duration-300",
    {
      "opacity-50 cursor-progress": pending,
    },
  );

  const renderLabel = () => {
    const isSave = label === "save";
    const text = pending
      ? isSave
        ? "Saving..."
        : "Updating..."
      : isSave
        ? "Save"
        : "Update";

    return (
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
          />
        </svg>
        <span>{text}</span>
      </>
    );
  };

  return (
    <button
      type="submit"
      className={className}
      disabled={pending}
      aria-label={label === "save" ? "Save changes" : "Update changes"}
    >
      {renderLabel()}
    </button>
  );
};
