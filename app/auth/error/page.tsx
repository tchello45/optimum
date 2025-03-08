import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import Link from "next/link";

export default function AuthErrorPage() {
  return (
    <div
      className={cn(
        "flex flex-col gap-6 items-center justify-center min-h-screen px-4"
      )}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <Icon
          icon="tabler:alert-circle"
          width={48}
          className="text-destructive"
        />
        <h1 className="text-2xl font-bold">Authentication Error</h1>
        <p className="text-muted-foreground text-sm">
          Wrong credentials. Please check your login details and try again.
        </p>
      </div>
      <Link href="/login">
        <Button className="w-full">Back to Login</Button>
      </Link>
    </div>
  );
}
