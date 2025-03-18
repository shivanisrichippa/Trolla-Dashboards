"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "./src/components/Sidebar"; // Correct Import Path

export default function Dashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (!token) {
        setIsAuthenticated(false); // User is not authenticated
        router.replace("/login"); // Redirect immediately to login page if no token
      } else {
        setIsAuthenticated(true); // User is authenticated
      }
    }
  }, [router]); // Add router as dependency to ensure it updates properly

  if (isAuthenticated === null) {
    return <div className="h-screen flex items-center justify-center text-gray-500">Loading...</div>; // Avoid flickering during authentication check
  }

  if (!isAuthenticated) {
   
    return null;
  }

  // If authenticated, show the dashboard
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Dashboard Content */}
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-2 text-gray-600">
          Welcome to your dashboard. Here you can see an overview of your activity.
        </p>
        
      </div>
    </div>
  );
}


