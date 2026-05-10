import type { Metadata, Viewport } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { CartProvider } from '@/hooks/use-cart'
import './globals.css'

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'MARBAS | Warisan Nusantara dalam Sentuhan Modern',
  description: 'Temukan koleksi eksklusif parfum, pakaian, dan teknologi yang terinspirasi dari keindahan budaya Nusantara. MARBAS - Premium Indonesian Heritage Store.',
  keywords: ['MARBAS', 'Nusantara', 'Indonesian', 'Parfume', 'Wearable', 'Tech', 'Batik', 'Traditional', 'Modern'],
  authors: [{ name: 'MARBAS Team' }],
  creator: 'MARBAS',
  publisher: 'MARBAS',
  openGraph: {
    title: 'MARBAS | Warisan Nusantara dalam Sentuhan Modern',
    description: 'Temukan koleksi eksklusif parfum, pakaian, dan teknologi yang terinspirasi dari keindahan budaya Nusantara.',
    type: 'website',
    locale: 'id_ID',
    siteName: 'MARBAS',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MARBAS | Warisan Nusantara',
    description: 'Premium Indonesian Heritage Store - Parfume, Wearable, Tech',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  themeColor: '#8B6914',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="id" className={`${playfair.variable} ${inter.variable} bg-background`}>
      <body className="font-sans antialiased">
        <CartProvider>
          {children}
        </CartProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
