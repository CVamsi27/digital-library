import "../globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Providers from "./providers";
import { ThemeSwitcher } from "ui";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Welcome Page",
  description: "Welcome Page",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <header>
            <nav>
              <div className="relative m-0 p-0">
                <div className="absolute top-0 right-0 m-2 p-0">
                  <ThemeSwitcher />
                </div>
              </div>
            </nav>
          </header>
          <main>{children}</main>
          <footer></footer>
        </Providers>
      </body>
    </html>
  );
}
