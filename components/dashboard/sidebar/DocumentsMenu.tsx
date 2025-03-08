"use client";

import {
  SidebarGroup,
  SidebarMenu,
  SidebarGroupLabel,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuAction,
} from "@/components/ui/sidebar";
import {
  deleteDocument,
  changeDocumentTitle,
} from "@/utils/supabase/clientFunctions";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Icon } from "@iconify/react";
import { Database } from "@/types/supabase";
import { usePathname, useRouter } from "next/navigation";
import { useDocuments } from "@/contexts/DocumentsProvider";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function DocumentsMenu() {
  const { documents, refreshDocuments } = useDocuments();
  const [isEditDialogOpen, setEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [currentDoc, setCurrentDoc] =
    useState<Database["public"]["Tables"]["documents"]["Row"]>();
  const [newDocumentTitle, setNewDocumentTitle] = useState("");
  const router = useRouter();
  const pathname = usePathname();
  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Documents</SidebarGroupLabel>
      <SidebarMenu>
        {documents?.map(
          (document: Database["public"]["Tables"]["documents"]["Row"]) => (
            <SidebarMenuItem key={document.id}>
              <SidebarMenuButton
                className="cursor-pointer"
                onClick={() =>
                  router.push(`/dashboard/${document.document_id}`)
                }
                isActive={pathname === `/dashboard/${document.document_id}`}
              >
                <Icon icon="mdi:file-document" className="w-6 h-6 mr-2" />
                <span>{document.title}</span>
              </SidebarMenuButton>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuAction showOnHover>
                    <Icon
                      icon="mdi:dots-vertical"
                      className="w-6 h-6 cursor-pointer"
                    />
                  </SidebarMenuAction>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                  side="right"
                  align="end"
                  sideOffset={4}
                >
                  <DropdownMenuItem
                    onClick={() => {
                      setEditDialogOpen(true);
                      setCurrentDoc(document);
                    }}
                    className="cursor-pointer"
                  >
                    <Icon icon="mdi:pencil" className="w-6 h-6 mr-2" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => {
                      setDeleteDialogOpen(true);
                      setCurrentDoc(document);
                    }}
                    className="cursor-pointer"
                  >
                    <Icon icon="mdi:trash-can" className="w-6 h-6 mr-2" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          )
        )}
      </SidebarMenu>
      <Dialog open={isEditDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Change Document Name</DialogTitle>
            <DialogDescription>
              Enter a new name for the document
            </DialogDescription>
            <div className="flex items-center gap-2">
              <Input
                id="document_name_change"
                defaultValue={currentDoc?.title || ""}
                onChange={(e) => setNewDocumentTitle(e.target.value)}
              />
              <DialogClose asChild>
                <Button
                  onClick={() => {
                    console.log("saving new document title");
                    changeDocumentTitle({
                      document_id: currentDoc?.document_id || "",
                      title:
                        newDocumentTitle || currentDoc?.title || "Untitled",
                    }).then(() => {
                      refreshDocuments();
                    });
                    setEditDialogOpen(false);
                  }}
                  className="cursor-pointer"
                >
                  Save
                </Button>
              </DialogClose>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      <Dialog open={isDeleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Document</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this document?
            </DialogDescription>
            <div className="flex items-center gap-2 w-full justify-center">
              <Button
                onClick={() => {
                  if (!currentDoc) return;
                  deleteDocument(currentDoc?.document_id).then(() => {
                    refreshDocuments();
                    router.push("/dashboard");
                  });
                  setDeleteDialogOpen(false);
                }}
                className="cursor-pointer flex-1"
                variant="destructive"
              >
                Yes
              </Button>
              <Button
                onClick={() => setDeleteDialogOpen(false)}
                className="cursor-pointer flex-1"
                variant="secondary"
              >
                No
              </Button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </SidebarGroup>
  );
}
