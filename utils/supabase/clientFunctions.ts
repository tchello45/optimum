"use client";

import { createClient } from "@/utils/supabase/client";

async function createDocument(document_name: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from("documents")
    .insert([{ title: document_name, user_id: user?.id }])
    .select();
  if (!data) {
    console.error("Error creating document", error);
    return;
  }
  if (!user) {
    console.error("Error creating document", error);
    return;
  }
  return data;
}

export { createDocument };