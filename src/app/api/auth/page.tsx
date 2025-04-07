"use client";
import { useState } from "react";

export default function LoginPage() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [gstAccount, setGstAccount] = useState("GST1");

  async function handleLogin() {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ name, password, gstAccount }),
    });

    const data = await res.json();
    if (res.ok) {
      localStorage.setItem("token", data.token);
      window.location.href = "/dashboard";
    } else {
      alert(data.error);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <input className="border p-2 mb-2" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <input type="password" className="border p-2 mb-2" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <select className="border p-2 mb-2" value={gstAccount} onChange={(e) => setGstAccount(e.target.value)}>
        <option value="GST1">GST Account 1</option>
        <option value="GST2">GST Account 2</option>
      </select>
      <button onClick={handleLogin} className="bg-blue-500 text-white p-2">Login</button>
    </div>
  );
}
