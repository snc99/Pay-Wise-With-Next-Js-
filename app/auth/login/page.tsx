"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError(result.error);
    } else {
      window.location.href = "/dashboard"; // Redirect ke dashboard
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
      {error && <p className="text-red-500">{error}</p>}
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="input input-bordered"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className="input input-bordered"
      />
      <button type="submit" className="btn btn-primary">
        Login
      </button>
    </form>
  );
}
