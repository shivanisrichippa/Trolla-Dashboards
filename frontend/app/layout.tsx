"use client";

import { ReactNode } from "react";
import { Provider } from "react-redux";
import  store  from "./src/redux/store";
import Sidebar from "./src/components/Sidebar";
import './globals.css';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>Your App Title</title>
      </head>
      <body className="bg-gray-100">
        <Provider store={store}>
          {children}
        </Provider>
      </body>
    </html>
  );
}
