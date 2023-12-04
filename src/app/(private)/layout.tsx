'use client'

import { Poppins } from 'next/font/google'
import { SessionProvider } from 'next-auth/react'

const poppins = Poppins({ weight: ['300', '400', '500', '600', '700'], style: ['italic', 'normal'], subsets: ['latin'] })

export default function PrivateRoute({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  )
}
