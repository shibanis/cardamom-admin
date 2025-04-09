"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// Define types for stock and sales items
type StockItem = {
  id: number;
  source: string;
  quantity: number;
};

type SalesItem = {
  id: number;
  customer: string;
  total: number;
};

export default function DashboardPage() {
  const [stock, setStock] = useState<StockItem[]>([]);  // Specify type for stock
  const [sales, setSales] = useState<SalesItem[]>([]);  // Specify type for sales
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/auth");
      return;
    }

    async function fetchData() {
      const resStock = await fetch("/api/stock", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const resSales = await fetch("/api/sales", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setStock(await resStock.json());
      setSales(await resSales.json());
    }

    fetchData();
  }, [router]);

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
      <div className="flex-1 bg-gray-900 p-6 overflow-y-auto">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">📦 Stock Overview</h2>
          <div className="bg-gray-900 p-4 rounded shadow">
            {stock.length === 0 ? (
              <p>No stock data available.</p>
            ) : (
              <ul className="list-disc list-inside">
                {stock.map((s) => (
                  <li key={s.id}>{s.source} - {s.quantity} kg</li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">🧾 Recent Sales</h2>
          <div className="bg-gray-900 p-4 rounded shadow">
            {sales.length === 0 ? (
              <p>No sales data available.</p>
            ) : (
              <ul className="list-disc list-inside">
                {sales.map((s) => (
                  <li key={s.id}>{s.customer} - ₹{s.total}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
