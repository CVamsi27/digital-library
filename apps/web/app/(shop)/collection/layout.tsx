import '../../globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Providers from './providers'
import { NavbarCustom } from 'ui';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Collection',
  description: 'Collection of books'
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <Providers>
          <header>
            <nav>
              <NavbarCustom />
            </nav>
          </header>
          <main>{children}</main>
          <footer></footer>
        </Providers>
      </body>
    </html>
  )
}
