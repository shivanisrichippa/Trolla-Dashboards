"use client";

import { useState } from "react";
import { FiHome, FiUser, FiLogOut, FiSettings, FiMenu } from "react-icons/fi";
import Link from "next/link";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div
      className={`bg-gradient-to-b from-gray-900 to-gray-800 text-white p-5 transition-all duration-300 ${
        isOpen ? "w-64" : "w-20"
      }`}
    >
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="mb-6 text-gray-300 hover:text-white transition-all"
      >
        <FiMenu size={24} />
      </button>

      {/* Navigation Links */}
      <nav className="flex flex-col space-y-4">
        <SidebarItem href="/dashboard" icon={<FiHome />} label="Dashboard" isOpen={isOpen} />
        <SidebarItem href="/profile" icon={<FiUser />} label="Profile" isOpen={isOpen} />
        <SidebarItem href="/settings" icon={<FiSettings />} label="Settings" isOpen={isOpen} />
        <SidebarItem href="/logout" icon={<FiLogOut />} label="Logout" isOpen={isOpen} />
      </nav>
    </div>
  );
}

const SidebarItem = ({ href, icon, label, isOpen }: { href: string; icon: React.ReactNode; label: string; isOpen: boolean }) => (
  <Link href={href} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-700 transition-all">
    <span className="text-xl">{icon}</span>
    {isOpen && <span className="text-lg">{label}</span>}
  </Link>
);
