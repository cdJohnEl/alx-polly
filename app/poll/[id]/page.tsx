"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
const RequireAuth = dynamic(() => import("@/components/poll/RequireAuth"), { ssr: false });

export default function PollVotePage({ params }: { params: { id: string } }) {
  const [poll, setPoll] = useState<any | null>(null);
  const [selected, setSelected] = useState<string[]>([]);
  const [voted, setVoted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const polls = JSON.parse(localStorage.getItem("polls") || "[]");
    const found = polls.find((p: any) => p.id === params.id);
    setPoll(found || null);
  }, [params.id]);

  if (!poll) {
    return <div className="max-w-xl mx-auto mt-20 text-center text-gray-500">Poll not found.</div>;
  }

  function handleVote() {
    if (selected.length === 0) return;
    const polls = JSON.parse(localStorage.getItem("polls") || "[]");
    const idx = polls.findIndex((p: any) => p.id === poll.id);
    if (idx !== -1) {
      selected.forEach(opt => {
        polls[idx].votes[opt] = (polls[idx].votes[opt] || 0) + 1;
      });
      localStorage.setItem("polls", JSON.stringify(polls));
      setPoll(polls[idx]);
      setVoted(true);
    }
  }

  const multiple = poll.settings?.multipleChoice;

  const VoteUI = (
    <div className="max-w-xl mx-auto mt-20 bg-white rounded-xl shadow p-8">
      <h1 className="text-2xl font-bold mb-2">{poll.title}</h1>
      <div className="text-gray-600 mb-4">{poll.description}</div>
      <form onSubmit={e => { e.preventDefault(); handleVote(); }}>
        <div className="space-y-3 mb-6">
          {poll.options.map((opt: string, idx: number) => (
            <label key={idx} className="flex items-center gap-3">
              <input
                type={multiple ? "checkbox" : "radio"}
                name="option"
                value={opt}
                checked={selected.includes(opt)}
                onChange={e => {
                  if (multiple) {
                    setSelected(sel =>
                      e.target.checked
                        ? [...sel, opt]
                        : sel.filter(o => o !== opt)
                    );
                  } else {
                    setSelected([opt]);
                  }
                }}
              />
              <span>{opt}</span>
              <span className="ml-2 text-xs text-gray-400">{poll.votes[opt] || 0} votes</span>
            </label>
          ))}
        </div>
        <button type="submit" className="bg-primary text-white px-6 py-2 rounded font-semibold shadow hover:bg-primary/90 transition" disabled={voted}>
          {voted ? "Thank you for voting!" : "Submit Vote"}
        </button>
      </form>
      <div className="mt-6 flex justify-between">
        <button className="text-gray-500 hover:underline" onClick={() => router.push("/")}>Back to Polls</button>
        <button className="text-blue-500 hover:underline" onClick={() => router.push(`/poll/${poll.id}/results`)}>View Results</button>
      </div>
    </div>
  );

  return poll.settings?.requireLogin ? <RequireAuth>{VoteUI}</RequireAuth> : VoteUI;
}
