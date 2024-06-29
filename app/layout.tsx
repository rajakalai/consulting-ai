import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

import Header from './components/Header'
import MainNavigation from './components/MainNavigation'
import PageTransition from './components/PageTransition'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-purple-dark min-h-screen flex flex-col">
        <Header />
        <MainNavigation />
        {children}
      </body>
    </html>
  )
}