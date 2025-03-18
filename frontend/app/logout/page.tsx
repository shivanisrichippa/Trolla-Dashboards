"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Logout() {
  const router = useRouter();

  useEffect(() => {
    // Perform Logout Actions
    localStorage.removeItem("token");
    localStorage.removeItem("name"); 
    router.replace("/login"); 
  }, [router]);

  return (
    <div className="h-screen flex items-center justify-center text-gray-500">
      Logging out...
    </div>
  );
}
