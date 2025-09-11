import { signIn as nextAuthSignIn, signOut as nextAuthSignOut } from "next-auth/react";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth";

export async function signIn(provider: "google" | "github") {
  await nextAuthSignIn(provider);
}

export async function signOut() {
  await nextAuthSignOut();
}

export async function getUserPolls(userId: string) {
  // Mock data for user polls
  return [
    { id: "1", question: "What's your favorite color?", options: ["Red", "Blue", "Green"], votes: [2, 5, 3] },
    { id: "2", question: "Best programming language?", options: ["JavaScript", "Python", "Go"], votes: [4, 6, 1] },
  ];
}

export async function getSession() {
  return await getServerSession(authOptions);
}
