"use client";

import {
  SidebarGroup,
  SidebarMenu,
  SidebarGroupLabel,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Icon } from "@iconify/react";
import { createDocument } from "@/utils/supabase/clientFunctions";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useDocuments } from "@/contexts/DocumentsProvider";
import { useRouter } from "next/navigation";

export default function ActionsMenu() {
  const [newDocumentName, setNewDocumentName] = useState("");
  const { refreshDocuments } = useDocuments();
  const router = useRouter();
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Actions</SidebarGroupLabel>
      <SidebarMenu>
        <SidebarMenuItem>
          <Dialog>
            <DialogTrigger asChild>
              <SidebarMenuButton className="cursor-pointer">
                <Icon icon="mdi:plus" className="w-6 h-6 mr-2" />
                <span>New Document</span>
              </SidebarMenuButton>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create a new document</DialogTitle>
              </DialogHeader>
              <DialogDescription>
                Enter a name for your new document
              </DialogDescription>
              <div className="flex items-center gap-2">
                <Input
                  id="document_name"
                  placeholder="Document name"
                  onChange={(e) => setNewDocumentName(e.target.value)}
                />
                <DialogClose asChild>
                  <Button
                    onClick={() => {
                      createDocument(newDocumentName).then((data) => {
                        refreshDocuments();
                        router.push(`/dashboard/${data?.document_id}`);    
                      });
                    }}
                    className="cursor-pointer"
                  >
                    Create
                  </Button>
                </DialogClose>
              </div>
            </DialogContent>
          </Dialog>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  );
}
