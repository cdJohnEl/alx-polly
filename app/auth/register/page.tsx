"use client";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const { register } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await register(email, password);
      router.push("/");
    } catch (err: any) {
      setError(err.message);
    }
    setLoading(false);
  }

  return (
    <div className="max-w-md mx-auto mt-20 bg-white rounded-xl shadow p-8">
      <h1 className="text-2xl font-bold mb-6">Register</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Email</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full border rounded px-3 py-2" required />
        </div>
        <div>
          <label className="block font-medium mb-1">Password</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full border rounded px-3 py-2" required />
        </div>
        {error && <div className="text-red-500 font-medium">{error}</div>}
        <button type="submit" className="bg-primary text-white px-6 py-2 rounded font-semibold shadow hover:bg-primary/90 transition" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
      <div className="mt-4 text-sm text-gray-500">
        Already have an account? <a href="/auth/login" className="text-blue-500 hover:underline">Login</a>
      </div>
    </div>
  );
}
