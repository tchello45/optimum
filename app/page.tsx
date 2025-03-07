import { FeatureCard } from "@/components/FeatureCard";
import { createClient } from "@/utils/supabase/server";
import NavbarComponent from "@/components/Navbar";

const features = [
  {
    title: "Real-time Collaboration",
    description:
      "Work together with your team in real-time. No more waiting for changes to be made.",
    icon: "bx:bx-group",
  },
  {
    title: "Advanced AI Features",
    description:
      "Optimum uses advanced AI to help you create content faster and more efficiently.",
    icon: "bx:bx-brain",
  },
  {
    title: "Seamless Workflow",
    description:
      "Optimum is designed to supercharge your workflow and make content creation a breeze.",
    icon: "bx:bx-cube-alt",
  },
];

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return (
    <div className="relative flex w-full flex-col">
      <NavbarComponent user={user} />
      <section className="flex flex-col items-center justify-center gap-[18px] sm:gap-6 mt-20 mb-40">
        <div className="flex flex-col md:flex-row justify-center items-center text-center">
          <p className="text-5xl md:text-7xl font-extrabold text-inherit pb-4 md:pb-0 md:mr-4">
            Welcome to
          </p>
          <p className="text-5xl md:text-7xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-600">
            Optimum
          </p>
        </div>

        <p className="text-center font-normal leading-7 text-default-500 sm:w-[466px] sm:text-[18px]">
          Introducing Optimum – your all-in-one, real-time collaboration editor
          built for seamless teamwork and efficient content creation.
          Supercharge your workflow with Optimum today! Advanced AI features,
          real-time collaboration, and more.
        </p>

        <div className="grid grid-cols-1 gap-6 mt-10 md:grid-cols-3 md:max-w-[1000px] m-4">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </section>
    </div>
  );
}
