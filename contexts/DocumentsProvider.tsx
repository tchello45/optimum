"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { Database } from "@/types/supabase";
import { getDocuments } from "@/utils/supabase/clientFunctions";

interface DocumentsContextType {
  documents: Database["public"]["Tables"]["documents"]["Row"][];
  setDocuments: (
    documents: Database["public"]["Tables"]["documents"]["Row"][]
  ) => void;
  refreshDocuments: () => Promise<void>;
}

const DocumentsContext = createContext<DocumentsContextType | undefined>(
  undefined
);

export const DocumentsProvider = ({ children }: { children: ReactNode }) => {
  const [documents, setDocuments] = useState<
    Database["public"]["Tables"]["documents"]["Row"][]
  >([]);

  const refreshDocuments = async () => {
    const data = await getDocuments();
    if (data) {
      setDocuments(data);
    } else {
      setDocuments([]);
    }
  };

  return (
    <DocumentsContext.Provider
      value={{ documents, setDocuments, refreshDocuments }}
    >
      {children}
    </DocumentsContext.Provider>
  );
};

export const useDocuments = (): DocumentsContextType => {
  const context = useContext(DocumentsContext);
  if (!context) {
    throw new Error("useDocuments must be used within a DocumentsProvider");
  }
  return context;
};
