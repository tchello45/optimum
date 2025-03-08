import { Icon } from "@iconify/react";
import DashboardNav from "@/components/dashboard/navbars/DashboardNavbar";

export default async function AIPage() {
  return (
    <>
      <DashboardNav />
      <div className="h-full flex flex-col items-center justify-center p-6">
        <header className="mb-8 text-center">
          <p className="text-5xl md:text-7xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-600">
            Optimum Advanced AI
          </p>
          <h1 className="text-5xl md:text-7xl font-extrabold mb-4">
            Integration Coming Soon!
          </h1>
          <p className="text-lg">
            We are working on bringing you the best AI integration possible.
          </p>
        </header>
        <section className="w-full max-w-3xl  shadow-md rounded-lg p-6 border border-gray-200">
          <h2 className="text-2xl font-bold mb-4">Features:</h2>
          <ul className="space-y-4">
            <li className="flex items-center space-x-3">
              <Icon icon="mdi:format-align-left" className="text-2xl" />
              <span className="text-lg">AI Summarization</span>
            </li>
            <li className="flex items-center space-x-3">
              <Icon icon="mdi:school" className="text-2xl" />
              <span className="text-lg">
                Generate Next Level Learning Plans
              </span>
            </li>
            <li className="flex items-center space-x-3">
              <Icon icon="mdi:lightbulb-on" className="text-2xl" />
              <span className="text-lg">
                Kickstart Your Projects with a Custom Project Plan
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
