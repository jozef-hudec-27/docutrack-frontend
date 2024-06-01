import { Arimo } from 'next/font/google'
import { Toaster } from 'react-hot-toast'

import FetchUser from './FetchUser'
import ReactQueryProvider from './ReactQueryProvider'

import '../styles/globals.scss'

const arimo = Arimo({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <FetchUser />

      <ReactQueryProvider>
        <body className={arimo.className}>
          <Toaster toastOptions={{ className: '!text-black-75 !rounded-[16px]', duration: 5000 }} />

          {children}
        </body>
      </ReactQueryProvider>
    </html>
  )
}
