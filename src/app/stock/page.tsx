"use client";

import { useEffect, useState } from "react";

// Define type for stock items
type StockItem = {
  id: string;
  source: string;
  grade: string;
  quantity: number;
  purchasePrice: number;
};

export default function StockPage() {
  const [stock, setStock] = useState<StockItem[]>([]);
  const [form, setForm] = useState({
    source: "",
    grade: "",
    quantity: "",
    purchasePrice: "",
  });

  useEffect(() => {
    async function fetchStock() {
      const res = await fetch("/api/stock", {
        headers: { "gst-account": "GST1" },
      });
      const data = await res.json();
      setStock(data);
    }

    fetchStock();
  }, []);

  async function addStock() {
    await fetch("/api/stock", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        quantity: parseFloat(form.quantity),
        purchasePrice: parseFloat(form.purchasePrice),
        gstAccount: "GST1",
      }),
    });
    window.location.reload(); // Can be replaced with fetchStock() for smoother UX
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Stock Management</h1>

      {/* Form */}
      <div className="mb-6 space-y-2">
        <input
          placeholder="Source"
          value={form.source}
          onChange={(e) => setForm({ ...form, source: e.target.value })}
          className="border p-2 w-full"
        />
        <input
          placeholder="Grade"
          value={form.grade}
          onChange={(e) => setForm({ ...form, grade: e.target.value })}
          className="border p-2 w-full"
        />
        <input
          type="number"
          placeholder="Quantity (kg)"
          value={form.quantity}
          onChange={(e) => setForm({ ...form, quantity: e.target.value })}
          className="border p-2 w-full"
        />
        <input
          type="number"
          placeholder="Purchase Price (per kg)"
          value={form.purchasePrice}
          onChange={(e) => setForm({ ...form, purchasePrice: e.target.value })}
          className="border p-2 w-full"
        />
        <button onClick={addStock} className="bg-blue-600 text-white px-4 py-2 rounded">
          Add Stock
        </button>
      </div>

      {/* Stock List */}
      <h2 className="text-xl font-semibold mb-2">Current Stock</h2>
      <ul className="space-y-1">
        {stock.map((s) => (
          <li key={s.id} className="border p-2 rounded">
            <strong>{s.source}</strong> - {s.grade} - {s.quantity}kg @ ₹{s.purchasePrice}/kg
          </li>
        ))}
      </ul>
    </div>
  );
}
