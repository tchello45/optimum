"use client";

import Editor from "@/components/editor/Tiptap";
import * as Y from "yjs";
import { IndexeddbPersistence } from "y-indexeddb";
import { TiptapCollabProvider } from "@hocuspocus/provider";
import { useEffect } from "react";

export default function EditorPage({ document_id }: { document_id: string }) {
  const ydoc = new Y.Doc();
  useEffect(() => {
    if (typeof window !== "undefined" && window.indexedDB) {
      new IndexeddbPersistence(document_id, ydoc);
    }
  }, [document_id, ydoc]);

  const provider = new TiptapCollabProvider({
    name: document_id,
    appId: process.env.NEXT_PUBLIC_TIPTAP_APP_ID || "jkvvg64k",
    document: ydoc,
    onSynced() {
      console.log("Synced");
    },
  });
  return <Editor key={document_id} ydoc={ydoc} provider={provider} />;
}
