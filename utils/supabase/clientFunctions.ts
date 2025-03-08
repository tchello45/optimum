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
  console.log("getting documents");
  const supabase = await createClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (!user) {
    console.error("Error getting user", userError);
    return;
  } else {
    console.log("got user");
  }

  const { data, error } = await supabase
    .from("documents")
    .select()
    .eq("user_id", user?.id);
  if (!data) {
    console.error("Error getting documents", error);
    return;
  } else {
    console.log("got documents");
  }
  return data as Database["public"]["Tables"]["documents"]["Row"][];
}

async function getDocument(document_id: string) {
  console.log("getting document");
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("documents")
    .select()
    .match({ document_id });
  if (!data) {
    console.error("Error getting document", error);
    return;
  } else {
    console.log("got document");
  }
  return data[0] as Database["public"]["Tables"]["documents"]["Row"];
}

async function deleteDocument(document_id: string) {
  console.log("deleting document");
  const supabase = await createClient();
  const { error } = await supabase
    .from("documents")
    .delete()
    .match({ document_id });
  if (error) {
    console.error("Error deleting document", error);
    return;
  } else {
    console.log("deleted document");
  }
}

async function changeDocumentTitle({document_id, title}: {document_id: string, title: string}) {
  console.log("changing document title");
  const supabase = await createClient();
  console.log(document_id, title);
  const { data, error } = await supabase
    .from("documents")
    .update({ title })
    .match({ document_id });
  console.log(data, error);
  if (error) {
    console.error("Error changing document title", error);
    return;
  } else {
    console.log("changed document title");
  }
}

export { createDocument, getDocuments, getDocument, deleteDocument, changeDocumentTitle };
