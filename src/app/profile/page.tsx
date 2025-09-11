import { getSession, getUserPolls, signOut } from "../../actions";
import { useEffect, useState } from "react";

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [polls, setPolls] = useState<any[]>([]);

  useEffect(() => {
    async function fetchData() {
      const session = await getSession();
      if (session?.user) {
        setUser(session.user);
        // Check if user has an id property before calling getUserPolls
        if ("id" in session.user && session.user.id) {
          const userPolls = await getUserPolls((session.user as { id: string }).id);
          setPolls(userPolls);
        } else {
          setPolls([]);
        }
      }
    }
    fetchData();
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-2">Profile</h2>
      <p className="mb-4">Name: {user.name}</p>
      <p className="mb-4">Email: {user.email}</p>
      <button
        className="bg-red-500 text-white px-4 py-2 rounded mb-6"
        onClick={signOut}
      >
        Sign Out
      </button>
      <h3 className="text-xl font-semibold mb-2">Your Polls</h3>
      <ul>
        {polls.map((poll) => (
          <li key={poll.id} className="mb-2 p-2 border rounded">
            <strong>{poll.question}</strong>
            <ul className="ml-4">
              {poll.options.map((opt: string, idx: number) => (
                <li key={idx}>{opt} - {poll.votes[idx]} votes</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}
