import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Premiera Live',
  description: 'Marketing Agency in Saudi Arabia',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
