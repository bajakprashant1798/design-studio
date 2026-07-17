import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import QueryProvider from '@/providers/query-provider'
import { StoreProvider } from '@/context/store-context'
import Header from '@/components/layout/header'
import Footer from '@/components/layout/footer'
import SlideCart from '@/components/cart/slide-cart'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'DESIGN STUDIO | Premium Essential Apparel',
  description:
    'Curation of premium slow-fashion essential apparel designed for the modern uniform.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white text-zinc-950 dark:bg-black dark:text-zinc-50 font-sans">
        <QueryProvider>
          <StoreProvider>
            <Header />
            <main className="flex-grow flex flex-col">{children}</main>
            <SlideCart />
            <Footer />
          </StoreProvider>
        </QueryProvider>
      </body>
    </html>
  )
}
