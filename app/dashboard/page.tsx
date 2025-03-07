import { createClient } from "@/utils/supabase/server";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="h-full text-center flex flex-col items-center">
      <p className="text-5xl md:text-7xl font-extrabold text-inherit pb-4 md:pb-0 md:mr-4 ">
        Welcome {user?.user_metadata.full_name}!
      </p>
    </div>
  );
}
