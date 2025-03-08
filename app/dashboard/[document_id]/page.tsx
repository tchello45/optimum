import { getDocument } from "@/utils/supabase/serverFunctions";
import { redirect } from "next/navigation";
import EditorPage from "@/components/editor/Editor";

export default async function DashboardPage({
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
  
  return <EditorPage document_id={document_id} key={document_id} />;
}
