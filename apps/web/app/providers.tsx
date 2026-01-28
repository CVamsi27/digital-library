"use client";

import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { CartProvider, SourceProvider } from "ui";
import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
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
        <SourceProvider>
          <CartProvider>
            <NextUIProvider className="h-full">
              <NextThemesProvider
                attribute="class"
                defaultTheme="dark"
                themes={["light", "dark"]}
              >
                {children}
              </NextThemesProvider>
            </NextUIProvider>
          </CartProvider>
        </SourceProvider>
      </SessionProvider>
    </QueryClientProvider>
  );
}
