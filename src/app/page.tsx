"use client";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Sign In</h1>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
  onClick={() => signIn("google")}
      >
        Sign in with Google
      </button>
      <button
        className="bg-gray-800 text-white px-4 py-2 rounded"
  onClick={() => signIn("github")}
      >
        Sign in with GitHub
      </button>
    </div>
  );
}
