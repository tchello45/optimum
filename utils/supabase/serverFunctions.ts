"use server";

import { createClient } from "@/utils/supabase/server";
import { Database } from "@/types/supabase";

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
  return data[0] as Database["public"]["Tables"]["documents"]["Row"];
}

async function getDocuments() {
  const supabase = await createClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (!user) {
    console.error("Error getting user", userError);
    return;
  }

  const { data, error } = await supabase
    .from("documents")
    .select()
    .eq("user_id", user?.id);
  if (!data) {
    console.error("Error getting documents", error);
    return;
  }
  return data as Database["public"]["Tables"]["documents"]["Row"][];
}

async function getDocument(document_id: string) {
  const supabase = await createClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (!user) {
    console.error("Error getting user", userError);
    return;
  }

  const { data, error } = await supabase
    .from("documents")
    .select()
    .eq("document_id", document_id);
  if (!data) {
    console.error("Error getting document", error);
    return;
  }
  return data[0] as Database["public"]["Tables"]["documents"]["Row"];
}
export { createDocument, getDocuments, getDocument };
