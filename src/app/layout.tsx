'use client' 

import { Box } from '@chakra-ui/react'
import './globals.css'
import { Providers } from './providers'
import { SessionProvider } from 'next-auth/react'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <Providers>
            <Box h="100vh" minW="100%">
              {children}
            </Box>
          </Providers>
        </SessionProvider>
      </body>
    </html>
  )
}
