'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { IconType } from 'react-icons'
import { FiHome, FiPhone, FiBarChart2, FiSearch, FiMessageSquare, FiSettings, FiChevronLeft, FiChevronRight } from 'react-icons/fi'

interface SidebarItem {
  icon: IconType
  text: string
  href: string
}

const sidebarItems: SidebarItem[] = [
  { icon: FiHome, text: 'Home', href: '/' },
  { icon: FiPhone, text: 'Calls', href: '/calls' },
  { icon: FiBarChart2, text: 'Quant Tracker', href: '/quant-trackers' },
  { icon: FiSearch, text: 'Ctrl+F', href: '/ctrl-f' },
  { icon: FiMessageSquare, text: 'Junior GPT', href: '/juniorgpt' },
  { icon: FiSettings, text: 'Settings', href: '/settings' },
]

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className={`relative h-full bg-white text-black transition-all duration-300 ease-in-out ${isOpen ? 'w-64' : 'w-16'} flex-shrink-0 shadow-lg z-10`}> {/* Changed to shadow-lg and added z-10 */}
      <nav className="mt-6">
        {sidebarItems.map((item, index) => (
          <Link key={index} href={item.href}>
            <div className="flex items-center p-4 hover:bg-gray-100">
              <div className="w-6 h-6 flex items-center justify-center">
                <item.icon size={20} />
              </div>
              <span className={`ml-4 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 w-0'}`}>
                {item.text}
              </span>
            </div>
          </Link>
        ))}
      </nav>
      <button 
        className="absolute top-[50px] -right-4 bg-white text-black border border-gray-200 rounded-full p-1 hover:bg-gray-100 focus:outline-none shadow-md z-20" // Added z-20
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <FiChevronLeft size={20} /> : <FiChevronRight size={20} />}
      </button>
    </div>
  )
}