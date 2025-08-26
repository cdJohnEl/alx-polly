// Simple in-memory poll store for demo purposes
export type Poll = {
  id: string;
  question: string;
  options: string[];
  votes: number[];
};

let polls: Poll[] = [
  {
    id: "1",
    question: "What's your favorite programming language?",
    options: ["JavaScript", "Python", "TypeScript", "Go"],
    votes: [5, 3, 2, 1],
  },
];

export function getPolls(): Poll[] {
  return polls;
}

export function getPoll(id: string): Poll | undefined {
  return polls.find((p) => p.id === id);
}

export function createPoll(question: string, options: string[]): Poll {
  const newPoll: Poll = {
    id: (polls.length + 1).toString(),
    question,
    options,
    votes: Array(options.length).fill(0),
  };
  polls.push(newPoll);
  return newPoll;
}

export function votePoll(id: string, optionIdx: number): Poll | undefined {
  const poll = getPoll(id);
  if (poll && poll.votes[optionIdx] !== undefined) {
    poll.votes[optionIdx]++;
    return poll;
  }
  return undefined;
}

export function deletePoll(id: string): boolean {
  const idx = polls.findIndex((p) => p.id === id);
  if (idx !== -1) {
    polls.splice(idx, 1);
    return true;
  }
  return false;
}
