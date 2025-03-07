export default async function Editor({
  params,
}: {
  params: Promise<{ document_id: string }>;
}) {
  const ready_params = await params;
  const document_id = ready_params.document_id;
  return (
    <div className="h-full text-center flex flex-col items-center">
      <p className="text-5xl md:text-7xl font-extrabold text-inherit pb-4 md:pb-0 md:mr-4 ">
        Editor {document_id}!
      </p>
    </div>
  );
}
