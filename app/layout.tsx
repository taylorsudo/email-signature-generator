import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import Script from 'next/script'
import './globals.css'

export const metadata: Metadata = {
  title: 'Email Signature Generator',
  description: 'Create a professional email signature in seconds. Customize with your logo, social media links, and contact information.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/images/favicon.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/images/favicon.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/images/favicon.png',
        type: 'image/png',
      },
    ],
    apple: '/images/favicon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
        <Script
          src="https://buttons.github.io/buttons.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  )
}
