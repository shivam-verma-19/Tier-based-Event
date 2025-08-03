import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4">
      <SignedOut>
        <h1 className="text-3xl font-bold mb-4">Welcome to Tier Events</h1>
        <Link href="/sign-in" className="text-blue-500 underline">Sign In</Link>
      </SignedOut>
      <SignedIn>
        <UserButton />
        <h1 className="text-3xl font-bold mb-4">Explore Events</h1>
        <Link href="/events" className="text-blue-500 underline">Go to Events</Link>
      </SignedIn>
    </main>
  );
}