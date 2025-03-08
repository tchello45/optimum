"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { ModeToggle } from "@/components/ModeToggle";

export default function DashboardNav() {
  return (
    <header className="sticky top-0 z-10 flex h-12 shrink-0 items-center gap-2 transition-[width,height] ease-linear  bg-background">
      <div className="flex items-center gap-2 px-4 w-full justify-between">
        <div className="flex items-center gap-2">
          <SidebarTrigger className="-ml-1 cursor-pointer" />
        </div>
        <div className="flex items-center gap-2">
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
