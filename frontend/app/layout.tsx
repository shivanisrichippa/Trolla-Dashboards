"use client";

import { ReactNode } from "react";
import Sidebar from "./src/components/Sidebar";
import './globals.css'

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>Your App Title</title>
        {/* Include your meta tags, links, and other head elements here */}
      </head>
      <body className="bg-gray-100">
        {children}
      </body>
    </html>
  );
}
