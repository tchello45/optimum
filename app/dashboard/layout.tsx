import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { UserProvider } from "@/contexts/UserProvider";
import AppSidebar from "@/components/dashboard/sidebar/Sidebar";
import { DocumentsProvider } from "@/contexts/DocumentsProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <UserProvider>
      <DocumentsProvider>
        <SidebarProvider className="flex flex-col md:flex-row w-full flex-1 mx-auto overflow-hidden h-screen">
          <AppSidebar />
          <SidebarInset className="overflow-y-auto ">{children}</SidebarInset>
        </SidebarProvider>
      </DocumentsProvider>
    </UserProvider>
  );
}
