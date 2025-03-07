import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { UserProvider } from "@/contexts/UserProvider";
import AppSidebar from "@/components/dashboard/sidebar/Sidebar";
import DashboardNav from "@/components/dashboard/Navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <UserProvider>
      <SidebarProvider className="flex flex-col md:flex-row w-full flex-1 mx-auto overflow-hidden h-screen">
        <AppSidebar />
        <SidebarInset className="overflow-y-auto ">
          <DashboardNav />
          {children}
        </SidebarInset>
      </SidebarProvider>
    </UserProvider>
  );
}
