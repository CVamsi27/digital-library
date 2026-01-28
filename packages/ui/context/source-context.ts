"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type BookSource = "google" | "openlibrary";

type SourceContextType = {
  selectedSource: BookSource;
  setSelectedSource: (source: BookSource) => void;
};

const SourceContext = createContext<SourceContextType | undefined>(undefined);

export const useSource = () => {
  const context = useContext(SourceContext);
  if (!context) {
    throw new Error("useSource must be used within a SourceProvider");
  }
  return context;
};

export const SourceProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [selectedSource, setSelectedSource] = useState<BookSource>("google");

  useEffect(() => {
    const stored = localStorage.getItem("bookSource");
    if (stored === "google" || stored === "openlibrary") {
      setSelectedSource(stored);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("bookSource", selectedSource);
  }, [selectedSource]);

  return (
    <SourceContext.Provider value={{ selectedSource, setSelectedSource }}>
      {children}
    </SourceContext.Provider>
  );
};