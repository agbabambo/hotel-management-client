import { Inter } from 'next/font/google'
import type { Metadata } from 'next'

import AuthProvider from '@/components/providers/AuthProvider'
import Navbar from '@/components/Navbar'
import { Toaster } from '@/components/ui/toaster'
import { cn } from '@/lib/utils'
import './globals.css'
import PaypalProvider from '@/components/providers/PaypalProvider'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Winterfall Hotel',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body className={cn('h-full w-full', inter.className)}>
        <AuthProvider>
          <PaypalProvider>
            <Navbar />
            {children}
            <Footer />
          </PaypalProvider>
        </AuthProvider>
        <Toaster />
      </body>
    </html>
  )
}
