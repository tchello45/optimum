import { Icon } from "@iconify/react";
import DashboardNav from "@/components/dashboard/navbars/DashboardNavbar";
import AIChat from "@/components/dashboard/ai/AIChat";

export default async function AIPage() {
  return (
    <>
      <DashboardNav />
      <div className="h-full flex flex-col items-center justify-center p-6">
        <AIChat />
      </div>
    </>
  );
}
