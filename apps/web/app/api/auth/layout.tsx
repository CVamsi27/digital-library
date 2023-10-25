import "../globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Providers from "@/app/providers";
import Navbar from "@/app/(lib)/components/navbar";
import { getServerSession } from "next-auth";
import { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Login",
  description: "Login",
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
  const [user, setUser] = useState(session);

  useEffect(() => {
    setUser(session);
  }, [session]);

  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers session={user}>
          <header>
            <nav>
              <Navbar />
            </nav>
          </header>
          <main>{children}</main>
          <footer></footer>
        </Providers>
      </body>
    </html>
  );
}
