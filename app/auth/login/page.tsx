"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import LoginLayout from "./layout";
import Alert from "@/app/components/sweetalert/AlertButton";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false); // Menambahkan state untuk loading

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true); // Set loading menjadi true sebelum proses login

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError(result.error); // Atur error jika terjadi kesalahan
      } else {
        window.location.href = "/dashboard"; // Redirect ke dashboard jika login sukses
      }
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred");
    } finally {
      setIsLoading(false); // Set loading menjadi false setelah proses login selesai
    }
  };

  const handleAlertClose = () => {
    setError(null); // Reset error setelah alert ditutup
  };

  return (
    <>
      <LoginLayout>
        {/* Komponen Alert hanya muncul jika ada error */}
        <Alert
          title="Login Failed"
          text={error || ""}
          icon="error"
          confirmButtonText="Try Again"
          trigger={!!error} // Trigger alert hanya saat error ada
          onClose={handleAlertClose} // Callback setelah alert ditutup
        />

        <form
          onSubmit={handleSubmit}
          className="mx-auto flex max-w-sm flex-col space-y-6 rounded-xl bg-white p-6 shadow-lg"
        >
          <div className="mb-6 flex justify-center">
            <img
              src="https://placehold.co/600x400.png"
              alt="Logo"
              className="h-24 w-24 rounded-full"
            />
          </div>
          <div className="relative">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              placeholder="Email"
              className="focus:ring-blue-500 input input-bordered w-full rounded-lg p-3 text-gray-700 transition duration-200 ease-in-out focus:outline-none focus:ring-2"
            />
          </div>
          <div className="relative">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              placeholder="Password"
              className="focus:ring-blue-500 input input-bordered w-full rounded-lg p-3 text-gray-700 transition duration-200 ease-in-out focus:outline-none focus:ring-2"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading} // Disable tombol jika loading
            className={`button-login w-full rounded-lg bg-blue-new py-3 font-semibold text-white shadow-md hover:bg-blue ${
              isLoading ? "cursor-not-allowed" : ""
            }`} // Menambahkan kelas cursor-not-allowed jika isLoading true
          >
            {isLoading ? (
              <span className="loading loading-spinner loading-md"></span> // Menampilkan loading spinner jika isLoading true
            ) : (
              "Login"
            )}
          </button>
        </form>
      </LoginLayout>
    </>
  );
}
