"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { ModeToggle } from "@/components/ModeToggle";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { inviteCollaborator } from "@/utils/supabase/clientFunctions";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function DocumentNav({ document_id }: { document_id: string }) {
  const [inviteEmail, setInviteEmail] = useState("");
  return (
    <header className="sticky top-0 z-10 flex h-12 shrink-0 items-center gap-2 transition-[width,height] ease-linear  bg-background">
      <div className="flex items-center gap-2 px-4 w-full justify-between">
        <div className="flex items-center gap-2">
          <SidebarTrigger className="-ml-1 cursor-pointer" />
        </div>
        <div className="flex items-center gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="icon" className="cursor-pointer">
                <Icon icon="mdi:account-plus" className="w-6 h-6" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Invite collaborators</DialogTitle>
                <DialogDescription>
                  This action cannot be undone. Everyone you invite will be able
                  to view and edit this document forever.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Input
                  placeholder="Email"
                  onChange={(e) => setInviteEmail(e.target.value)}
                />
                <DialogClose asChild>
                  <Button variant="secondary" className="cursor-pointer">
                    Cancel
                  </Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button
                    type="submit"
                    className="cursor-pointer"
                    onClick={() =>
                      inviteCollaborator({
                        document_id: document_id,
                        email: inviteEmail,
                      })
                    }
                  >
                    Confirm
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
