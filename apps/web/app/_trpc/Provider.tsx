"use client";
import { QueryClient, QueryClientProvider } from "trpc";
import { httpBatchLink } from "trpc/client";
import React, { PropsWithChildren, useState } from "react";

import { t } from "trpc/client/client";

export default function Provider({ children }: PropsWithChildren) {
  const url = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}/api/trpc`
      : 'http://localhost:3000/api/trpc';
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
