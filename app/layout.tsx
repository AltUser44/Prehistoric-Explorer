import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Interactive Dinosaur Explorer',
  description: 'An interactive 3D dinosaur exploration experience',
  generator: 'Created by Kester Nekese',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
