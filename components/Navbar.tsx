"use client";

import { useRouter } from "next/navigation";
import type { User } from "@supabase/supabase-js";
import { useSignOut } from "@/hooks/useSignOut";
import { Button } from "@/components/ui/button";
import Logo from "./Logo";
import { ModeToggle } from "./ModeToggle";

export default function NavbarComponent({ user }: { user?: User | null }) {
  const router = useRouter();
  const signOut = useSignOut();

  return (
    <nav className="sticky top-0 z-50 w-full bg-inherit backdrop-blur-lg ">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Logo className="hidden sm:flex" />

          <div className="flex items-center space-x-4 mr-4">
            {!user ? (
              <>
                <Button
                  onClick={() => router.push("/login")}
                  className="cursor-pointer"
                >
                  Sign In
                </Button>
              </>
            ) : (
              <>
                <Button
                  onClick={() => router.push("/dashboard")}
                  className="cursor-pointer"
                >
                  Dashboard
                </Button>
                <Button
                  onClick={signOut}
                  className="cursor-pointer"
                  variant="secondary"
                >
                  Sign Out
                </Button>
              </>
            )}
          </div>
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
}
