import { Arimo } from 'next/font/google'
import { Toaster } from 'react-hot-toast'

import ReactQueryProvider from './ReactQueryProvider'
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
      <ReactQueryProvider>
        <body className={arimo.className}>
          <Toaster toastOptions={{ className: '!text-black-75 !rounded-[16px]', duration: 5000 }} />

          <Navbar />
          {children}
        </body>
      </ReactQueryProvider>
    </html>
  )
}
