"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./src/redux/userSlice";
import Sidebar from "./src/components/Sidebar";
import { RootState } from "./src/redux/store";

export default function Home() {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      const name = localStorage.getItem("name");
      const email = localStorage.getItem("email");

      if (!token) {
        router.replace("/login"); // Redirect to login if token not found
      } else {
        if (!user.token) {
          // Dispatch user data to Redux store if not already there
          dispatch(setUser({ name, email, token }));
        }
        router.replace("/dashboard"); // Redirect to dashboard if token exists
      }
    }
  }, [dispatch, router, user.token]);

  if (!user.token) {
    return <div className="h-screen flex items-center justify-center text-gray-500">Loading...</div>;
  }

  return <Sidebar />; // Render Sidebar if user is authenticated
}
