"use client";

import { useRouter } from "next/navigation";

/**
 * A custom hook that provides a sign-out handler.
 *
 * This hook returns an asynchronous callback function that sends a POST request to the "/auth/signout" endpoint.
 * If the sign-out is successful, it redirects the user to the home page using the router.
 *
 * @returns {() => Promise<void>} An asynchronous function that handles the sign out process.
 */
export function useSignOut() {
  const router = useRouter();

  const handleSignOut = async () => {
    const res = await fetch("/auth/signout", { method: "POST" });
    if (res.ok) {
      router.push("/");
    }
  };

  return handleSignOut;
}
