"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [gstAccount, setGstAccount] = useState("GST1");
  const router = useRouter();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, password, gstAccount }),
    });

    if (res.ok) {
      router.push("/dashboard");
    } else {
      alert("Invalid credentials");
    }
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow-md">
        <h1 className="text-2xl font-bold mb-4">Login</h1>
        <input type="text" placeholder="Username" value={name} onChange={(e) => setName(e.target.value)} className="border p-2 w-full mb-2" required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="border p-2 w-full mb-2" required />
        <select value={gstAccount} onChange={(e) => setGstAccount(e.target.value)} className="border p-2 w-full mb-2">
          <option value="GST1">GST Account 1</option>
          <option value="GST2">GST Account 2</option>
        </select>
        <button type="submit" className="bg-blue-500 text-white p-2 w-full">Login</button>
      </form>
    </div>
  );
}
