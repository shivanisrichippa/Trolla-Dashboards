"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
// const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
export const backendUrl =  process.env.NEXT_PUBLIC_BACKEND_URL;

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post(`${backendUrl}/api/auth/login`, { email, password });
      
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        router.push('/dashboard');
      } else {
        setError(response.data.message);
      }
    } catch (error: any) {
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white">
      <div className="w-full max-w-sm p-6 space-y-6 bg-[#121212] text-white rounded-xl shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl">
        <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4" autoComplete="off">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 mt-1 bg-[#1b1b1b] rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 text-white"
              autoComplete="off"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 mt-1 bg-[#1b1b1b] rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 text-white"
              autoComplete="off"
              required
            />
          </div>
          {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
          <button
            type="submit"
            className="w-full p-3 mt-4 font-bold text-white bg-gray-700 rounded-lg hover:bg-gray-800 transition-all"
          >
            Login
          </button>
        </form>
        <div className="text-center mt-4">
          <p className="text-sm text-gray-400">
            Don't have an account?{" "}
            <a href="/signup" className="text-gray-300 hover:underline">
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
