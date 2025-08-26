

"use client";
import { useEffect, useState } from "react";
import PollCard from "@/components/poll/PollCard";
import Link from "next/link";

export default function Home() {
  const [polls, setPolls] = useState<any[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("polls");
    if (stored) {
      setPolls(JSON.parse(stored));
    }
  }, []);

  return (
    <div className="max-w-6xl mx-auto mt-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Polls</h1>
        <Link href="/create">
          <button className="bg-primary text-white px-6 py-2 rounded-lg font-semibold shadow hover:bg-primary/90 transition">Create New Poll</button>
        </Link>
      </div>
      {polls.length === 0 ? (
        <div className="text-gray-500">No polls yet. Create one!</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {polls.map((poll) => (
            <PollCard key={poll.id} poll={poll} />
          ))}
        </div>
      )}
    </div>
  );
}
