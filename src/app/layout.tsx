import './globals.css'
import 'react-datepicker/dist/react-datepicker.css'

import { LayoutContextProvider } from '@/contexts/layout'
import { DataContextProvider } from '@/contexts/data'
import { Noto_Sans_Thai } from 'next/font/google'

import type { Metadata } from 'next'

const notoSansThai = Noto_Sans_Thai({ subsets: ['thai'], display: 'fallback' })

export const metadata: Metadata = {
  title: 'Skytrain Ticket Booking',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <link rel="icon" href="/next.svg" />
      <body suppressHydrationWarning className={notoSansThai.className}>
        <DataContextProvider>
          <LayoutContextProvider>{children}</LayoutContextProvider>
        </DataContextProvider>
      </body>
    </html>
  )
}
