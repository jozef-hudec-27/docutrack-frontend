import { Arimo } from 'next/font/google'

import Navbar from './components/Navbar/Navbar'

import '../styles/globals.scss'

const arimo = Arimo({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={arimo.className}>
        <Navbar />
        {children}
      </body>
    </html>
  )
}
