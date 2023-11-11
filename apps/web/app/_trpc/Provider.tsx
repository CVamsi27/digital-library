"use client";
import { QueryClient, QueryClientProvider } from "trpc";
import React, { PropsWithChildren, useState } from "react";
import { t } from "trpc/client/client";
import { httpBatchLink } from "trpc/client";

export default function Provider({ children }: PropsWithChildren) {
  const url = process.env.NEXT_PUBLIC_VERCEL_URL
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api/trpc`
    : `http://localhost:${process.env.PORT ?? 3000}/api/trpc`;
    console.log(process.env.NEXT_PUBLIC_VERCEL_URL)
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
