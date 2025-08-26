import Link from "next/link";

interface PollCardProps {
  poll: any;
}

export default function PollCard({ poll }: PollCardProps) {
  const totalVotes = Object.values(poll.votes || {}).reduce((a, b) => Number(a) + Number(b), 0) as number;
  return (
    <div className="bg-white rounded-xl shadow p-5 hover:shadow-lg transition flex flex-col justify-between">
      <Link href={`/poll/${poll.id}`} className="font-bold text-lg mb-2 hover:underline">
        {poll.title}
      </Link>
      <div className="text-gray-600 mb-2">{poll.description}</div>
      <div className="flex gap-4 text-sm text-gray-500 mb-2">
        <span>{poll.options.length} options</span>
        <span>{totalVotes} votes</span>
      </div>
      <div className="text-xs text-gray-400">Created {new Date(poll.createdAt).toLocaleDateString()}</div>
    </div>
  );
}
