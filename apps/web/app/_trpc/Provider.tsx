"use client";
import { QueryClient, QueryClientProvider } from "trpc";
import React, { PropsWithChildren, useState } from "react";
import { t } from "trpc/client/client";
import { httpBatchLink } from "trpc/client";

export default function Provider({ children }: PropsWithChildren) {
  const url = "https://digital-library-web.vercel.app/api/trpc";
  const [queryClient] = useState(() => new QueryClient({}));
  const [trpcClient] = useState(() =>
    t.createClient({
      links: [
        httpBatchLink({
          url,
        }),
      ],
    }),
  );
  return (
    <t.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </t.Provider>
  );
}
