'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold">
              School Management
            </Link>
          </div>
          <div className="flex space-x-4 items-center">
            <Link
              href="/addSchool"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                pathname === '/addSchool'
                  ? 'bg-blue-700 text-white'
                  : 'text-blue-100 hover:bg-blue-500 hover:text-white'
              }`}
            >
              Add School
            </Link>
            <Link
              href="/showSchools"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                pathname === '/showSchools'
                  ? 'bg-blue-700 text-white'
                  : 'text-blue-100 hover:bg-blue-500 hover:text-white'
              }`}
            >
              Show Schools
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
