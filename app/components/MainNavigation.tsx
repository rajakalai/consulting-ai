"use client"
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function MainNavigation() {
  const pathname = usePathname();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Calls', path: '/calls' },
    { name: 'Quant Trackers', path: '/quant-trackers' },
    { name: 'Playlists', path: '/playlists' },
    { name: 'CTRL + F', path: '/ctrl-f' },
    { name: 'JuniorGPT', path: '/juniorgpt', beta: true },
    { name: 'Settings', path: '/settings' },
  ];

  return (
    <nav className="bg-purple-800 bg-opacity-50 px-6 py-5 flex justify-between items-center">
      <h1 className="text-xl font-bold text-white flex items-center">
        EdTech Demo
        <span className="ml-2 flex space-x-1">
          <span className="w-6 h-6 rounded-full bg-[#DB48FF] flex items-center justify-center text-xs">C</span>
          <span className="w-6 h-6 rounded-full bg-[#FF8B35] flex items-center justify-center text-xs">D</span>
          <span className="w-6 h-6 rounded-full bg-[#39E879] flex items-center justify-center text-xs">S</span>
          <span className="w-6 h-6 rounded-full bg-[#3594FF] flex items-center justify-center text-xs">A</span>
          <span className="w-6 h-6 rounded-full bg-white text-purple-800 flex items-center justify-center text-xs">+</span>
        </span>
      </h1>
      <div className="flex space-x-6">
        {navItems.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            className={`text-sm ${
              pathname === item.path ? 'text-white font-semibold' : 'text-gray-300'
            } hover:text-white`}
          >
            {item.name}
            {item.beta && <sup className="ml-1 text-xs bg-purple-600 px-1 rounded">BETA</sup>}
          </Link>
        ))}
      </div>
    </nav>
  );
}