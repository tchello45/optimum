"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import Logo from "@/components/Logo";
import UserNav from "./UserNav";
import ActionsMenu from "./ActionsMenu";
import LinksMenu from "./LinksMenu";
import DocumentsMenu from "./DocumentsMenu";

export default function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="flex flex-row justify-center align-center data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
        <Logo />
      </SidebarHeader>
      <SidebarContent>
        <LinksMenu />
        <ActionsMenu />
        <DocumentsMenu />
      </SidebarContent>
      <SidebarFooter>
        <UserNav />
      </SidebarFooter>
    </Sidebar>
  );
}
