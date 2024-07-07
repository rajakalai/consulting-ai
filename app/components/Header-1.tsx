import Link from 'next/link'
import Image from 'next/image'
import { FiSettings } from 'react-icons/fi'

export default function Header() {
  return (
    <header className="bg-white text-black shadow-lg py-4 px-1 h-20 border-b border-gray-200"> {/* Added border-b */}
      <div className="container mx-auto h-full flex items-center justify-between">
        <div className="flex items-center">
          <Image src="/consulting-ai-logo.png" alt="Consulting AI Logo" width={32} height={32} />
          <span className="ml-2 font-bold text-xl">Consulting-AI</span>
        </div>
        {/* <nav className="flex space-x-8">
          <Link href="/products" className="text-lg font-semibold hover:text-gray-600">Products</Link>
          <Link href="/pricing" className="text-lg font-semibold hover:text-gray-600">Pricing</Link>
          <Link href="/resources" className="text-lg font-semibold hover:text-gray-600 flex items-center">
            Resources
            <span className="ml-2 bg-blue-500 text-white text-xs rounded-full px-2 py-1">4</span>
          </Link>
        </nav> */}
        <div className="flex items-center space-x-6">
          {/* <button className="text-gray-600 hover:text-black">
            <FiSettings size={24} />
          </button> */}
          <div className="w-10 h-10 rounded-full border-2 border-gray-300 overflow-hidden">
            <Image 
              src="/user.jpg" 
              alt="Profile" 
              width={40} 
              height={40} 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </header>
  )
}