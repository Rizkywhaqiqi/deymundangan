import type { Metadata } from 'next'
import { Inter, Playfair_Display, Great_Vibes, Cormorant_Garamond } from 'next/font/google'
import './globals.css'
import { Toaster } from 'sonner'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
})

const greatVibes = Great_Vibes({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})

const cormorantGaramond = Cormorant_Garamond({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-script',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Wedding Invitation Premium',
    template: '%s | Wedding Invitation',
  },
  description: 'Undangan Pernikahan Digital Premium',
  icons: {
    icon: '/favicon.ico',
    apple: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="id"
      className={`${inter.variable} ${playfairDisplay.variable} ${greatVibes.variable} ${cormorantGaramond.variable}`}
      suppressHydrationWarning
    >
      <body className="font-sans antialiased">
        {children}
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              background: '#faf8f5',
              border: '1px solid rgba(201, 169, 110, 0.2)',
              color: '#2d2d2d',
            },
          }}
        />
      </body>
    </html>
  )
}