"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import LoginLayout from "./layout";
import Alert from "@/app/components/sweetalert/AlertButton";
import Image from "next/image";
import { FiEye, FiEyeOff } from "react-icons/fi";
import Swal from "sweetalert2";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
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

    e.preventDefault();

    setIsLoading(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError(result.error);
      } else {
        // Redirect ke /dashboard setelah login sukses
        router.push("/dashboard");

        // Tampilkan Toast setelah halaman berhasil dimuat
        Toast.fire({
          icon: "success",
          title: "Anda berhasil login!",
        });
      }
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LoginLayout>
      <Alert
        title="Login Gagal"
        text={error || ""}
        icon="error"
        confirmButtonText="Coba Lagi"
        trigger={!!error}
        onClose={() => setError(null)}
      />
      <form
        onSubmit={handleSubmit}
        className="mx-auto flex max-w-sm flex-col space-y-6 rounded-xl bg-white p-6 shadow-lg"
      >
        <div className="mb-6 flex justify-center">
          <Image
            src="/logo/logo.png"
            alt="Logo"
            width={96}
            height={96}
            className="object-cover"
          />
        </div>
        <div className="relative">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            placeholder="Email"
            className="input input-bordered w-full rounded-lg p-3 text-gray-700 transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            placeholder="Password"
            className="input input-bordered w-full rounded-lg p-3 text-gray-700 transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 transform text-gray-600"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
          </button>
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className={`button-login bg-blue-new hover:bg-blue w-full rounded-lg py-3 font-semibold text-white shadow-md ${
            isLoading ? "cursor-not-allowed" : ""
          }`}
        >
          {isLoading ? (
            <span className="loading loading-spinner loading-md"></span>
          ) : (
            "Login"
          )}
        </button>
      </form>
    </LoginLayout>
  );
}
