// import './globals.css'
// import { Inter } from 'next/font/google'

// const inter = Inter({ subsets: ['latin'] })

// import Header from './components/Header'
// import MainNavigation from './components/MainNavigation'
// import PageTransition from './components/PageTransition'

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode
// }) {
//   return (
//     <html lang="en">
//       <body className="bg-purple-dark min-h-screen flex flex-col">
//         <Header />
//         <MainNavigation />
//         {children}
//       </body>
//     </html>
//   )
// }

import Header from './components/Header-1'
import Sidebar from './components/sidebar-1'
import './globals.css'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 flex flex-col h-screen">
        <Header />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar />
          <main className="flex-1 overflow-auto bg-white"> {/* Added bg-gray-100 for contrast */}
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}