import { Icon } from "@iconify/react";
import DashboardNav from "@/components/dashboard/navbars/DashboardNavbar";

export default async function ChatPage() {
  return (
    <>
      <DashboardNav />
      <div className="h-full flex flex-col items-center justify-center p-6">
        <header className="mb-8 text-center">
          <p className="text-5xl md:text-7xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-600">
            Optimum Chat
          </p>
          <h1 className="text-5xl md:text-7xl font-extrabold mb-4">
            Integration Coming Soon!
          </h1>
          <p className="text-lg">
            We are working on bringing you the best chat integration possible.
          </p>
        </header>
        <section className="w-full max-w-3xl  shadow-md rounded-lg p-6 border border-gray-200">
          <h2 className="text-2xl font-bold mb-4">Features:</h2>
          <ul className="space-y-4">
            <li className="flex items-center space-x-3">
              <Icon icon="mdi:chat" className="text-2xl" />
              <span className="text-lg">Realtime Chat</span>
            </li>
            <li className="flex items-center space-x-3">
              <Icon icon="mdi:file-document" className="text-2xl" />
              <span className="text-lg">Share Optimum Documents</span>
            </li>
            <li className="flex items-center space-x-3">
              <Icon icon="mdi:account-group" className="text-2xl" />
              <span className="text-lg">
                Collaborate with Your Team in Realtime
              </span>
            </li>
            <li className="flex items-center space-x-3">
              <Icon icon="mdi:rocket-launch" className="text-2xl" />
              <span className="text-lg">And Much More!</span>
            </li>
          </ul>
        </section>
      </div>
    </>
  );
}
