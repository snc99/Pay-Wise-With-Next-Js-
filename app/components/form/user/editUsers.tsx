"use client";

import { updateUser } from "@/lib/actionsUser";
import { useState } from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { SubmitButton } from "../../button/buttonUser";
import { BackButton } from "../../button/buttonBack";
import type { Users } from "@prisma/client";

const UpdateFormUser = ({ user }: { user: Users }) => {
  const [error, setError] = useState<{ name?: string; phone?: string }>({});
  const [pending, setPending] = useState(false);
  const router = useRouter();

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPending(true);

    const form = new FormData(e.target as HTMLFormElement);
    const response = await updateUser(user.id, null, form);

    if (response.success) {
      // Tampilkan pesan sukses dengan SweetAlert
      Toast.fire({
        icon: "success",
        text: response.message,
        timer: 2000,
        showConfirmButton: false,
      });

      // Redirect ke halaman /dashboard/users setelah sukses
      router.push("/dashboard/users");
    } else if (response.error) {
      // Set error dari response untuk ditampilkan di form
      setError({
        name: response.error?.name ? response.error.name[0] : undefined,
        phone: response.error?.phone ? response.error.phone[0] : undefined,
      });
    }

    setPending(false);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-5">
          <label htmlFor="Name" className="mb-2 block text-gray-900">
            Nama
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
            placeholder="John Doe"
            defaultValue={user.name}
          />
          {error?.name && (
            <p className="mt-2 text-sm text-red-500">{error.name}</p>
          )}
        </div>

        <div className="mb-5">
          <label htmlFor="phone" className="mb-2 block text-gray-900">
            Nomor Telepon
          </label>
          <input
            type="text"
            name="phone"
            id="phone"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
            placeholder="Phone Number"
            defaultValue={user.phone}
          />
          {error?.phone && (
            <p className="mt-2 text-sm text-red-500">{error.phone}</p>
          )}
        </div>

        <div className="flex gap-x-4">
          <SubmitButton label="Update" pending={pending} />
          <BackButton />
        </div>
      </form>
    </div>
  );
};

export default UpdateFormUser;
