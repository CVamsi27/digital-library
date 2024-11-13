"use client";

import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "ui";
import { useState } from "react";

export default function Providers({
  children,
  session,
}: {
  children: React.ReactNode;
  session: any;
}) {
  const [client] = useState(new QueryClient());
  return (
    <QueryClientProvider client={client}>
      <SessionProvider session={session}>
        <NextUIProvider className="h-full">
          <NextThemesProvider
            attribute="class"
            defaultTheme="dark"
            themes={["light", "dark"]}
          >
            {children}
          </NextThemesProvider>
        </NextUIProvider>
      </SessionProvider>
    </QueryClientProvider>
  );
}
