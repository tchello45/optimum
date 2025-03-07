import Editor from "@/components/editor/Tiptap";
import { getDocument } from "@/utils/supabase/serverFunctions";
import { redirect } from "next/navigation";

export default async function EditorPage({
  params,
}: {
  params: Promise<{ document_id: string }>;
}) {
  const ready_params = await params;
  const document_id = ready_params.document_id;
  const document = await getDocument(document_id);
  if (!document) {
    redirect("/dashboard");
  }
  return <Editor key={document_id} document_id={document_id} />;
}
