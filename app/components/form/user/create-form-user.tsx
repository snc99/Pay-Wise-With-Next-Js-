"use client";

import { useState } from "react";
import Swal from "sweetalert2";
import { saveUser } from "@/lib/actionsUser";
import { SubmitButton } from "../../button/buttonUser";
import { BackButton } from "../../button/buttonBack";
import { useRouter } from "next/navigation"; // Import useRouter

const CreateFormUser = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({ name: "", phone: "" });
  const [error, setError] = useState<{ name?: string; phone?: string }>({});
  const [pending, setPending] = useState(false);

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
    const response = await saveUser(form);

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
        <div className="mb-3 mt-3">
          <label htmlFor="Name" className="mb-2 block text-gray-900">
            Nama Lengkap
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-400"
            placeholder="John Doe"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <div id="name-error" aria-live="polite" aria-atomic="true">
            <p className="mt-2 text-sm text-red-600">{error?.name}</p>
          </div>
        </div>
        <div className="mb-3 mt-3">
          <label htmlFor="phone" className="mb-2 block text-gray-900">
            Nomor Telepon
          </label>
          <input
            type="text"
            name="phone"
            id="phone"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-400"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
          />
          <div id="phone-error" aria-live="polite" aria-atomic="true">
            <p className="mt-2 text-sm text-red-500">{error?.phone}</p>
          </div>
        </div>
        <div className="flex gap-x-4">
          <SubmitButton label="save" pending={pending} />
          <BackButton />
        </div>
      </form>
    </div>
  );
};

export default CreateFormUser;
