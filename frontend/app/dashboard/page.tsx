
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "../src/components/Sidebar"; 
import { motion } from "framer-motion";
import axios from "axios"; 
export const backendUrl =  process.env.NEXT_PUBLIC_BACKEND_URL;

const Dashboard: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [name, setName] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");

      if (!token) {
        setIsAuthenticated(false);
        router.replace("/login");
      } else {
        setIsAuthenticated(true);

        axios.get(`${backendUrl}/api/user`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          if (response.data && response.data.name) {
            setName(response.data.name);
            localStorage.setItem("name", response.data.name);
          } else {
            console.error("No name found in the response.");
          }
        })
        .catch((error) => {
          console.error("Error fetching username:", error.response?.data || error.message);
          if (error.response?.status === 403) {
            localStorage.removeItem("token");
            router.replace("/login");
          }
        });
      }
    }
  }, [router]);

  if (isAuthenticated === null) {
    return (
      <div className="h-screen flex items-center justify-center text-gray-500">
        Loading...
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 flex flex-col justify-center items-center text-center p-6">
        <motion.h1
          className="text-4xl font-bold text-gray-900 mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <span className="mr-2 animate-wave" style={{ display: "inline-block" }}>👋</span>
          Hi {name || "User"}! Welcome!!!
        </motion.h1>

        <motion.p
          className="mt-2 text-gray-600 text-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5 }}
        >
          Here you can see an overview of your activity.
        </motion.p>
      </div>
    </div>
  );
};

export default Dashboard;
