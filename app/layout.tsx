import type { Metadata, Viewport } from 'next'
import { Roboto } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: '--font-roboto',
})

export const metadata: Metadata = {
  title: 'Google Rewards - Earn rewards for sharing your opinion',
  description: 'Answer quick surveys and earn Google Play credit or PayPal cash. Join millions of users already earning rewards.',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#4285f4',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
