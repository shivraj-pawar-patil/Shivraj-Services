import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
// import { Toaster } from '@/components/ui/toaster'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'OmSai-Optical',
  description: 'Boiler plate app to generate dashboards',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html className='dark' lang='en'>
        <body
          className={`${inter.variable} font-inter antialiased bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400`}
        >
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}