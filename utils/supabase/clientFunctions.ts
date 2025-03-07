"use client";

import { createClient } from "@/utils/supabase/client";
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

async function deleteDocument(document_id: string) {
  const supabase = await createClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (!user) {
    console.error("Error getting user", userError);
    return;
  }

  const { error } = await supabase
    .from("documents")
    .delete()
    .eq("document_id", document_id);
  if (error) {
    console.error("Error deleting document", error);
    return;
  }
}

async function changeDocumentTitle({document_id, title}: {document_id: string, title: string}) {
  const supabase = await createClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (!user) {
    console.error("Error getting user", userError);
    return;
  }
  console.log(document_id, title);
  const { error } = await supabase
    .from("documents")
    .update({ title })
    .eq("document_id", document_id);
  if (error) {
    console.error("Error changing document title", error);
    return;
  }
}

export { createDocument, getDocuments, getDocument, deleteDocument, changeDocumentTitle };
