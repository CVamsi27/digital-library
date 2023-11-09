import "../globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Providers from "../providers";
import Navbar from "../_lib/components/navbar";
import { getServerSession } from "next-auth";
import Provider from "@/app/_trpc/Provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Shop",
  description: "Collection of books",
  icons: {
    icon: "https://cdn.imgbin.com/23/15/24/imgbin-computer-icons-warranty-data-uri-scheme-font-warranty-qRwNmLRi3PNn5Acb5NrYi4gkg.jpg",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning={true}>
        <Providers session={session}>
          <header>
            <nav>
              <Navbar />
            </nav>
          </header>
          <main>
            <Provider>{children}</Provider>
          </main>
          <footer></footer>
        </Providers>
      </body>
    </html>
  );
}
