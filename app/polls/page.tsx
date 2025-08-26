// ...existing code...

"use client";
import { useState } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getPolls, votePoll, deletePoll, Poll } from "@/lib/db";
import Link from "next/link";

export default function PollsPage() {
  const [polls, setPolls] = useState<Poll[]>(getPolls());

  function handleVote(pollId: string, optionIdx: number) {
    votePoll(pollId, optionIdx);
    setPolls([...getPolls()]);
  }

  function handleDelete(pollId: string) {
    deletePoll(pollId);
    setPolls([...getPolls()]);
  }

  return (
    <div className="max-w-2xl mx-auto mt-20 space-y-6">
      <div className="flex justify-end mb-4">
        <Link href="/create-poll">
          <Button>Create New Poll</Button>
        </Link>
      </div>
      {polls.length === 0 ? (
        <Card>
          <CardHeader>No polls available.</CardHeader>
        </Card>
      ) : (
        polls.map((poll) => (
          <Card key={poll.id}>
            <CardHeader className="flex justify-between items-center">
              <span className="font-bold">{poll.question}</span>
              <Button className="bg-red-500 hover:bg-red-600" onClick={() => handleDelete(poll.id)}>
                Delete
              </Button>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {poll.options.map((opt, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <Button variant="outline" onClick={() => handleVote(poll.id, idx)}>
                      Vote
                    </Button>
                    <span>{opt} - {poll.votes[idx]} votes</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
}
