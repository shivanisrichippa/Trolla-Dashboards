"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { setAuthToken } from "../src/utils/auth";

export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:4000/api/auth/register", { 
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Signup failed");

      setAuthToken(data.token);
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white">
      <div className="w-full max-w-sm p-6 space-y-6 bg-[#121212] text-white rounded-xl shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl">
        <h2 className="text-2xl font-bold text-center mb-4">Sign Up</h2>
        {error && <p className="text-sm text-red-500 text-center">{error}</p>}
        
        <form onSubmit={handleSubmit} className="space-y-4" autoComplete="off">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={form.name}
              onChange={handleChange}
              className="w-full p-3 mt-1 bg-[#1b1b1b] rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 text-white"
              autoComplete="off"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="w-full p-3 mt-1 bg-[#1b1b1b] rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 text-white"
              autoComplete="off"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="w-full p-3 mt-1 bg-[#1b1b1b] rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 text-white"
              autoComplete="off"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full p-3 mt-4 font-bold text-white bg-gray-700 rounded-lg hover:bg-gray-800 transition-all"
          >
            Sign Up
          </button>
        </form>

        <div className="text-center mt-4">
          <p className="text-sm text-gray-400">
            Already have an account?{" "}
            <Link href="/login" className="text-gray-300 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
