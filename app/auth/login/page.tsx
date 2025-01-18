"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import LoginLayout from "./layout";
import Alert from "@/app/components/sweetalert/AlertButton";
import Image from "next/image";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
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
        window.location.href = "/dashboard";
      }
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAlertClose = () => {
    setError(null);
  };

  return (
    <>
      <LoginLayout>
        <Alert
          title="Login Failed"
          text={error || ""}
          icon="error"
          confirmButtonText="Try Again"
          trigger={!!error}
          onClose={handleAlertClose}
        />

        <form
          onSubmit={handleSubmit}
          className="mx-auto flex max-w-sm flex-col space-y-6 rounded-xl bg-white p-6 shadow-lg"
        >
          <div className="mb-6 flex justify-center">
            <Image
              src="https://placehold.co/600x400.png"
              alt="Logo"
              width={96} // Sesuaikan dengan `className="h-24 w-24"` (24 * 4 = 96px)
              height={96} // Sama dengan width untuk mempertahankan proporsi lingkaran
              className="rounded-full"
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
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              placeholder="Password"
              className="input input-bordered w-full rounded-lg p-3 text-gray-700 transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
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
    </>
  );
}
