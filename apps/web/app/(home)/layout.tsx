import "../globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Providers from "../providers";
import Navbar from "../_lib/components/navbar";
import { getServerSession } from "next-auth";
import { Footer } from "ui/components";

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
    <html lang="en" className="h-full">
      <body
        className={inter.className + " relative h-full font-mono antialiased"}
        suppressHydrationWarning={true}
      >
        <Providers session={session}>
          <main className="relative flex flex-col h-full">
            <Navbar />
            <div className="flex-grow flex-1 bg-background">{children}</div>
            <Footer />
          </main>
        </Providers>
      </body>
    </html>
  );
}
