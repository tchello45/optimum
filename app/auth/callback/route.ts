import { NextResponse } from "next/server";
// Client created using the Server-Side Auth instructions
import { createClient } from "@/utils/supabase/server";

/**
 * Handles the authentication callback by processing the URL parameters and exchanging the provided code for a session.
 *
 * The function extracts the "code" parameter from the incoming request's URL. It also validates the "next"
 * parameter to ensure it is a relative path (defaults to "/" if missing or invalid). If a valid "code" is present,
 * it uses Supabase to attempt an exchange for a user session. Based on the environment and headers,
 * the function then constructs the appropriate redirection URL:
 *
 * - In a development environment, it redirects using the original origin.
 * - When behind a load balancer (detected by the "x-forwarded-host" header), it constructs the URL using the forwarded host.
 * - Otherwise, it falls back to the original origin.
 *
 * If the "code" is missing or if the code exchange fails, the function redirects to an error page with authentication instructions.
 *
 * @param request - The incoming HTTP request object containing URL parameters and headers.
 * @returns A promise that resolves to a NextResponse object used for redirecting the user.
 */
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");

  // Validate the "next" parameter: ensure it's a relative URL; otherwise, default to "/"
  let next = searchParams.get("next");
  if (!next || !next.startsWith("/")) {
    next = "/";
  }

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      const forwardedHost = request.headers.get("x-forwarded-host"); // Original host before load balancer
      const isLocalEnv = process.env.NODE_ENV === "development";

      if (isLocalEnv) {
        // In development, no load balancer is assumed.
        return NextResponse.redirect(`${origin}${next}`);
      } else if (forwardedHost) {
        // When behind a load balancer, use the forwarded host.
        // Change to https if needed.
        return NextResponse.redirect(`http://${forwardedHost}${next}`);
      } else {
        // Fallback: use the original origin.
        return NextResponse.redirect(`${origin}${next}`);
      }
    }
  }

  // In case of missing code or error, redirect the user to an error page with instructions.
  return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}
