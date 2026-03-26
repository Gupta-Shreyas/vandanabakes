import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Vandana Bakes | Premium Home Bakery',
  description: 'A premium home bakery where every cake is baked to order. No freezing, no shortcuts, just pure home-baked love.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
