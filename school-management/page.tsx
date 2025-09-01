import Link from 'next/link'

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">
          Welcome to School Management System
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Manage your school data efficiently with our easy-to-use platform
        </p>
        
        <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
          <Link
            href="/addSchool"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-6 px-8 rounded-lg shadow-lg transition-colors text-center block"
          >
            <div className="text-2xl mb-2">📝</div>
            <h2 className="text-xl font-semibold mb-2">Add School</h2>
            <p className="text-blue-100">Register a new school in the system</p>
          </Link>
          
          <Link
            href="/showSchools"
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-6 px-8 rounded-lg shadow-lg transition-colors text-center block"
          >
            <div className="text-2xl mb-2">🏫</div>
            <h2 className="text-xl font-semibold mb-2">View Schools</h2>
            <p className="text-green-100">Browse all registered schools</p>
          </Link>
        </div>
      </div>
    </div>
  )
}
