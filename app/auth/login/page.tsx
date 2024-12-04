"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import LoginLayout from "./layout";

const LoginPage = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true); // Set loading to true when login starts
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    setLoading(false); // Set loading to false after login attempt

    if (result?.ok) {
      router.push("/dashboard");
    } else {
      setError("Login failed. Please check your credentials.");
    }
  };

  return (
    <LoginLayout>
      <div className="relative mx-auto w-full max-w-md bg-white px-6 pb-8 pt-10 shadow-xl ring-1 ring-gray-900/5 sm:rounded-xl sm:px-10">
        <div className="w-full">
          <div className="text-center">
            <h1 className="text-3xl font-semibold text-gray-900">Sign in</h1>
            <p className="mt-2 text-[#333333]">
              Sign in below to access your account
            </p>
          </div>
          <div className="mt-5">
            <form onSubmit={handleSubmit}>
              <div className="relative mt-6">
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email Address"
                  className="peer mt-1 w-full border-b-2 border-gray-300 bg-white px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
                  autoComplete="email"
                  required
                />
                <label
                  htmlFor="email"
                  className="pointer-events-none absolute left-0 top-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800"
                >
                  Email Address
                </label>
              </div>
              <div className="relative mt-6">
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  className="peer mt-1 w-full border-b-2 border-gray-300 bg-white px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
                  autoComplete="current-password"
                  required
                />
                <label
                  htmlFor="password"
                  className="pointer-events-none absolute left-0 top-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800"
                >
                  Password
                </label>
              </div>
              {error && (
                <p className="text-bold mt-5 text-sm text-red">{error}</p>
              )}
              <div className="my-6">
                <button
                  type="submit"
                  className="w-full rounded-md bg-black px-3 py-4 text-white hover:bg-gray-700 focus:bg-gray-600 focus:outline-none"
                  disabled={loading} // Disable button when loading
                >
                  {loading ? "Logging..." : "Sign in"}
                </button>
              </div>
              <p className="text-center text-sm text-gray-500">
                Don&#x27;t have an account yet?{" "}
                <a
                  href="/auth/register"
                  className="font-semibold text-gray-600 hover:underline focus:text-gray-800 focus:outline-none"
                >
                  Sign up
                </a>
                .
              </p>
            </form>
          </div>
        </div>
      </div>
    </LoginLayout>
  );
};

export default LoginPage;
