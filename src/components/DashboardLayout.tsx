"use client";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const router = useRouter();

  function handleLogout() {
    localStorage.removeItem("token");
    router.push("/auth");
  }

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-bold p-4 border-b border-gray-600">Admin Panel</h2>
          <nav className="p-4 space-y-2">
            <button onClick={() => router.push("/dashboard")} className="block w-full text-left hover:bg-gray-700 p-2 rounded">
              Dashboard
            </button>
            <button onClick={() => router.push("/sales")} className="block w-full text-left hover:bg-gray-700 p-2 rounded">
              Sales Report
            </button>
            <button onClick={() => router.push("/stock")} className="block w-full text-left hover:bg-gray-700 p-2 rounded">
              Purchase History
            </button>
          </nav>
        </div>
        <button onClick={handleLogout} className="p-4 text-red-400 hover:text-red-600 border-t border-gray-600">
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gray-900 p-6 overflow-y-auto">{children}</div>
    </div>
  );
}
