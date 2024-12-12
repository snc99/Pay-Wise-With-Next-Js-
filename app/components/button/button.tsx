"use client";

import Link from "next/link";
import { IoAddSharp } from "react-icons/io5";
import { TbTrashXFilled } from "react-icons/tb";
import { PiPencilSimpleLineFill } from "react-icons/pi";
import { useFormStatus } from "react-dom";
import clsx from "clsx";
import { deleteUser } from "@/lib/actions";

export const CreateUsers = () => {
  return (
    <Link
      href="/dashboard/users/create"
      className="inline-flex items-center space-x-1 rounded-lg bg-gray-200 px-5 py-[9px] text-sm text-black transition duration-200 hover:bg-gray-300 hover:text-blue"
    >
      <IoAddSharp size={20} />
      Create Users
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
  const DeleteUserWithId = deleteUser.bind(null, id);
  return (
    <form action={DeleteUserWithId}>
      <button className="rounded-sm border p-1 hover:bg-gray-200 hover:text-black">
        <TbTrashXFilled size={20} />
      </button>
    </form>
  );
};

// button submit dan create
export const SubmitButton = ({ label }: { label: string }) => {
  const { pending } = useFormStatus();

  const className = clsx(
    "mt-5 items-center rounded bg-blue-new px-4 py-2 font-bold text-white hover:bg-blue",
    {
      "opacity-50 cursor-progress": pending,
    },
  );

  return (
    <button type="submit" className={className} disabled={pending}>
      {label === "save" ? (
        <span>{pending ? "Saving..." : "Save"}</span>
      ) : (
        <span>{pending ? "Updating..." : "Update"}</span>
      )}
    </button>
  );
};
