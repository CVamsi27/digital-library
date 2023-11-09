"use client";
import { QueryClient, QueryClientProvider } from "trpc";
import React, { PropsWithChildren, useState } from "react";
import { t, tClient } from "trpc/client/client";

export default function Provider({ children }: PropsWithChildren) {
  const [queryClient] = useState(() => new QueryClient({}));
  const [trpcClient] = useState(() => tClient);
  return (
    <t.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </t.Provider>
  );
}
