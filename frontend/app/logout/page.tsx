"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
export const backendUrl =  process.env.NEXT_PUBLIC_BACKEND_URL;

export default function Logout() {
  const router = useRouter();

  useEffect(() => {
    const handleLogout = async () => {
      try {
        // Make a request to the logout API
        await axios.post(`${backendUrl}/api/auth/logout`, {}, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        });

        // Perform Logout Actions
        localStorage.removeItem("token");
        localStorage.removeItem("name");
        router.replace("/login"); 
      } catch (error) {
        console.error("Error logging out:", error);
      }
    };

    handleLogout();
  }, [router]);

  return (
    <div className="h-screen flex items-center justify-center text-gray-500">
      Logging out...
    </div>
  );
}
