
"use client";
import { useRouter } from "next/navigation";
import CreatePollForm from "@/components/poll/CreatePollForm";

export default function CreatePollPage() {
  const router = useRouter();

  function handleCreatePoll(data: any) {
    // Save poll to localStorage
    const polls = JSON.parse(localStorage.getItem("polls") || "[]");
    const newPoll = {
      ...data,
      id: Date.now().toString(),
      votes: {},
      createdBy: "User",
      createdAt: new Date().toISOString(),
    };
    localStorage.setItem("polls", JSON.stringify([...polls, newPoll]));
    router.push("/");
  }

  return (
    <div className="max-w-2xl mx-auto mt-20">
      <h1 className="text-2xl font-bold mb-6">Create a New Poll</h1>
      <CreatePollForm onCreate={handleCreatePoll} />
    </div>
  );
}
