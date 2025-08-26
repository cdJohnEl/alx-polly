import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-gray-900 text-white rounded-b-xl shadow flex items-center justify-between px-6 py-4 mb-6">
      <div className="flex items-center gap-3">
        <span className="font-bold text-lg tracking-wide">ALX Polly</span>
      </div>
      <nav className="flex items-center gap-6">
        <Link href="/" className="hover:underline">My Polls</Link>
        <Link href="/create" className="hover:underline">Create Poll</Link>
        <Link href="/create">
          <button className="bg-primary text-white px-4 py-2 rounded-lg font-semibold shadow hover:bg-primary/90 transition">Create Poll</button>
        </Link>
        <div className="ml-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-700 font-bold">U</div>
      </nav>
    </header>
  );
}
