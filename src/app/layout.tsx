import { Poppins } from 'next/font/google'

import './globals.css'

const poppins = Poppins({ weight: ['300', '400', '500', '600', '700'], style: ['italic', 'normal'], subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        {children}
      </body>
    </html>
  )
}
