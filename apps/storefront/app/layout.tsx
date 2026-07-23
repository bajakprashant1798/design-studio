import type { Metadata } from 'next'
import { Cormorant_Garamond, Inter } from 'next/font/google'
import './globals.css'
import QueryProvider from '@/providers/query-provider'
import { StoreProvider } from '@/lib/store'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { CartDrawer } from '@/components/commerce/CartDrawer'
import { SearchOverlay } from '@/components/search/SearchOverlay'
import { Toaster } from '@/components/ui/sonner'

const cormorant = Cormorant_Garamond({
  weight: ['300', '400', '500'],
  subsets: ['latin'],
  variable: '--font-serif',
})

const inter = Inter({
  weight: ['300', '400', '500', '600'],
  subsets: ['latin'],
  variable: '--font-sans',
})

export const metadata: Metadata = {
  title: 'DESIGN STUDIO — Ready-to-Wear',
  description:
    'Editorial ready-to-wear from an uncompromising Parisian house. Designed with quiet, made in Italy.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`dark ${cormorant.variable} ${inter.variable} h-full antialiased`}>
      <body className="flex min-h-screen flex-col bg-background text-foreground font-sans">
        <QueryProvider>
          <StoreProvider>
            <div className="flex min-h-screen flex-col bg-background text-foreground">
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
              <CartDrawer />
              <SearchOverlay />
              <Toaster />
            </div>
          </StoreProvider>
        </QueryProvider>
      </body>
    </html>
  )
}
