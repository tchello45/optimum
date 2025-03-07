import Link from 'next/link';
import { cn } from "@/lib/utils";

export default function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("flex w-full justify-start", className)}>
      <div className="flex aspect-square size-8 items-center justify-center rounded-lg">
        <div className="h-6 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
      </div>
      <div className="grid flex-1 text-left text-lg leading-tight items-center">
        <span className="truncate font-bold">Optimum</span>
      </div>
    </Link>
  );
}