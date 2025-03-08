"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export async function login(formData: FormData) {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);
  console.log(error);

  if (error) {
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/");
}
export async function googleLogin() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      // Optional: Provide a redirect URL here if it is not preset in Supabase.
      redirectTo:
        validateUrl(process.env.NEXT_PUBLIC_REDIRECT_URL) ||
        "http://localhost:3000/auth/callback",
      queryParams: {
        access_type: "offline",
        prompt: "consent",
      },
    },
  });

  if (error) {
    // Error handling: For example, redirect to an error page when an error occurs.
    console.error(error);
    redirect("/error");
  }

  /**
   * Validates a URL string.
   *
   * @param url - The URL string to validate.
   * @returns The URL string if valid, otherwise null.
   */
  function validateUrl(url: string | undefined): string | null {
    try {
      if (url) {
        new URL(url);
        return url;
      }
    } catch (e) {
      console.error("Invalid URL:", url);
      console.error(e);
    }
    return null;
  }

  // If a URL is returned, redirect the user to that URL.
  if (data?.url) {
    redirect(data.url);
  }

  // Fallback: if no URL is returned, redirect to the home page.
  redirect("/");
}
