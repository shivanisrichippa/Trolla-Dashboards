"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "./src/components/Sidebar";

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (!token) {
        setIsAuthenticated(false);
        router.replace("/login");
      } else {
        setIsAuthenticated(true);
        router.replace("/dashboard"); // Redirect to dashboard after login
      }
    }
  }, [router]);

  if (isAuthenticated === null) {
    return <div className="h-screen flex items-center justify-center text-gray-500">Loading...</div>;
  }

  return null;
}
