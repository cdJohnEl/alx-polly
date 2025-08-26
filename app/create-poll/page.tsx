// ...existing code...

"use client";
import { useState } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { createPoll } from "@/lib/db";
import { useRouter } from "next/navigation";

export default function CreatePollPage() {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState<string[]>([""]);
  const router = useRouter();

  function handleAddOption() {
    setOptions([...options, ""]);
  }

  function handleOptionChange(idx: number, value: string) {
    setOptions(options.map((opt, i) => (i === idx ? value : opt)));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (question && options.filter(Boolean).length >= 2) {
      createPoll(question, options.filter(Boolean));
      router.push("/polls");
    }
  }

  return (
    <Card className="max-w-md mx-auto mt-20">
      <CardHeader>
        <h2 className="text-xl font-bold">Create a New Poll</h2>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium mb-1">Question</label>
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Options</label>
            {options.map((opt, idx) => (
              <input
                key={idx}
                type="text"
                value={opt}
                onChange={(e) => handleOptionChange(idx, e.target.value)}
                className="w-full border rounded px-3 py-2 mb-2"
                required
              />
            ))}
            <Button type="button" onClick={handleAddOption} className="mt-2">Add Option</Button>
          </div>
          <Button type="submit" className="w-full">Create Poll</Button>
        </form>
      </CardContent>
    </Card>
  );
}
