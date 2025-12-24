import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'LipeSteak - Churrasco Premium para Eventos',
  description: 'Experiência de churrasco premium para momentos especiais. Aniversários, chás revelação, casamentos e confraternizações em Franco da Rocha e região.',
  keywords: 'churrasco, eventos, Franco da Rocha, churrasqueiro, churrasco premium, festa',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className={`${playfair.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  )
}
