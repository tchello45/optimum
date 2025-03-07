import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

/**
 * Handles the sign-out process for an authenticated user.
 *
 * This POST endpoint creates a Supabase client and calls the signOut method on the Supabase auth object.
 * If an error occurs during sign-out, it responds with a JSON error message and a 500 status code.
 * Otherwise, it returns a JSON response confirming that the sign-out was successful.
 *
 * @returns {Promise<NextResponse>} A promise that resolves to a JSON response indicating the sign-out status.
 */
export async function POST() {
  const supabase = await createClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ message: "Sign out successful" });
}
