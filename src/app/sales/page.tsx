"use client";

import { useEffect, useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";

// Define the type for a sale entry
type SaleItem = {
  id: string;
  customer: string;
  quantity: number;
  salePrice: number;
  total: number;
  paymentStatus: "Pending" | "Paid";
};

export default function SalesPage() {
  const [sales, setSales] = useState<SaleItem[]>([]);
  const [form, setForm] = useState({
    customer: "",
    quantity: "",
    salePrice: "",
    paymentStatus: "Pending" as "Pending" | "Paid",
  });

  useEffect(() => {
    async function fetchSales() {
      const res = await fetch("/api/sales", {
        headers: { "gst-account": "GST1" },
      });
      const data = await res.json();
      setSales(data);
    }

    fetchSales();
  }, []);

  async function addSale() {
    const quantity = parseFloat(form.quantity);
    const salePrice = parseFloat(form.salePrice);

    await fetch("/api/sales", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        customer: form.customer,
        quantity,
        salePrice,
        total: quantity * salePrice,
        paymentStatus: form.paymentStatus,
        gstAccount: "GST1",
      }),
    });

    window.location.reload(); // optionally replace with re-fetch
  }

  return (
    <DashboardLayout>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Sales Management</h1>

        {/* Sales Form */}
        <div className="mb-6 space-y-2">
          <input
            placeholder="Customer"
            value={form.customer}
            onChange={(e) => setForm({ ...form, customer: e.target.value })}
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
            placeholder="Sale Price (per kg)"
            value={form.salePrice}
            onChange={(e) => setForm({ ...form, salePrice: e.target.value })}
            className="border p-2 w-full"
          />
          <select
            value={form.paymentStatus}
            onChange={(e) =>
              setForm({ ...form, paymentStatus: e.target.value as "Pending" | "Paid" })
            }
            className="border p-2 w-full"
          >
            <option value="Pending">Pending</option>
            <option value="Paid">Paid</option>
          </select>
          <button
            onClick={addSale}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Add Sale
          </button>
        </div>

        {/* Sales List */}
        <h2 className="text-xl font-semibold mb-2">Recent Sales</h2>
        <ul className="space-y-1">
          {sales.map((s) => (
            <li key={s.id} className="border p-2 rounded">
              <strong>{s.customer}</strong> — {s.quantity}kg @ ₹{s.salePrice}/kg = ₹{s.total} {" "}
              <span className="text-sm text-gray-600">({s.paymentStatus})</span>
            </li>
          ))}
        </ul>
      </div>
    </DashboardLayout>

  );
}
