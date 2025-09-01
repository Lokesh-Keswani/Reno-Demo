'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

interface School {
  id: number
  name: string
  address: string
  city: string
  state: string
  contact: string
  image: string
  email_id: string
  created_at: string
}

export default function ShowSchools() {
  const [schools, setSchools] = useState<School[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [currentImageIndexes, setCurrentImageIndexes] = useState<{[key: number]: number}>({})

  // Helper function to parse images from JSON string
  const parseImages = (imageStr: string): string[] => {
    console.log('Parsing images for:', imageStr?.substring(0, 100) + '...')
    if (!imageStr) {
      console.log('No image string provided')
      return []
    }
    try {
      const parsed = JSON.parse(imageStr)
      const result = Array.isArray(parsed) ? parsed : [imageStr]
      console.log('Parsed images count:', result.length)
      result.forEach((img, idx) => {
        console.log(`Image ${idx}: ${img.startsWith('data:') ? 'base64 data URL' : 'file path'} - length: ${img.length}`)
      })
      return result
    } catch {
      // If not JSON, treat as single image path
      console.log('Failed to parse as JSON, treating as single image')
      return [imageStr]
    }
  }

  // Function to navigate to next image
  const nextImage = (schoolId: number, totalImages: number) => {
    setCurrentImageIndexes(prev => ({
      ...prev,
      [schoolId]: ((prev[schoolId] || 0) + 1) % totalImages
    }))
  }

  // Function to navigate to previous image
  const prevImage = (schoolId: number, totalImages: number) => {
    setCurrentImageIndexes(prev => ({
      ...prev,
      [schoolId]: ((prev[schoolId] || 0) - 1 + totalImages) % totalImages
    }))
  }

  // Get current image index for a school
  const getCurrentImageIndex = (schoolId: number): number => {
    return currentImageIndexes[schoolId] || 0
  }

  useEffect(() => {
    fetchSchools()
  }, [])

  const fetchSchools = async () => {
    try {
      const response = await fetch('/api/schools')
      const data = await response.json()

      if (data.success) {
        setSchools(data.schools)
      } else {
        setError('Failed to fetch schools')
      }
    } catch (err) {
      setError('Error loading schools')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading schools...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Schools</h1>
        <p className="text-xl text-gray-600">
          Discover the educational institutions in our network
        </p>
      </div>

      {schools.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🏫</div>
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">No schools found</h2>
          <p className="text-gray-500 mb-6">Be the first to add a school to our database!</p>
          <a
            href="/addSchool"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Add First School
          </a>
        </div>
      ) : (
        <>
          <div className="mb-6 text-center">
            <p className="text-lg text-gray-600">
              Showing {schools.length} school{schools.length !== 1 ? 's' : ''}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {schools.map((school) => (
              <div
                key={school.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                                 {/* School Images with Navigation */}
                 <div className="h-48 bg-gray-200 relative group">
                   {(() => {
                     const images = parseImages(school.image)
                     const currentIndex = getCurrentImageIndex(school.id)
                     
                     console.log(`School "${school.name}" (ID: ${school.id}):`, {
                       rawImage: school.image?.substring(0, 50) + '...',
                       parsedImagesCount: images.length,
                       currentIndex
                     })
                     
                     if (images.length === 0) {
                       console.log(`No images found for school ${school.name}`)
                       return (
                         <div className="flex items-center justify-center h-full">
                           <div className="text-6xl text-gray-400">🏫</div>
                         </div>
                       )
                     }
                     
                     return (
                       <div className="h-full relative">
                         {/* Current Image */}
                         {images[currentIndex].startsWith('data:') ? (
                           // Base64 image - use regular img tag
                           <img
                             src={images[currentIndex]}
                             alt={`${school.name} - Image ${currentIndex + 1}`}
                             className="w-full h-full object-cover transition-opacity duration-300"
                           />
                         ) : (
                           // Regular file path - use Next.js Image
                           <Image
                             src={images[currentIndex]}
                             alt={`${school.name} - Image ${currentIndex + 1}`}
                             fill
                             className="object-cover transition-opacity duration-300"
                             sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                           />
                         )}
                         
                         {/* Navigation Arrows (show only if multiple images) */}
                         {images.length > 1 && (
                           <>
                             {/* Previous Arrow */}
                             <button
                               onClick={(e) => {
                                 e.preventDefault()
                                 e.stopPropagation()
                                 prevImage(school.id, images.length)
                               }}
                               className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10"
                               aria-label="Previous image"
                             >
                               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                               </svg>
                             </button>
                             
                             {/* Next Arrow */}
                             <button
                               onClick={(e) => {
                                 e.preventDefault()
                                 e.stopPropagation()
                                 nextImage(school.id, images.length)
                               }}
                               className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10"
                               aria-label="Next image"
                             >
                               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                               </svg>
                             </button>
                           </>
                         )}
                         
                         {/* Image Counter */}
                         {images.length > 1 && (
                           <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                             {currentIndex + 1} / {images.length}
                           </div>
                         )}
                         
                         {/* Dots Indicator */}
                         {images.length > 1 && (
                           <div className="absolute bottom-2 left-2 flex gap-1">
                             {images.map((_, idx) => (
                               <button
                                 key={idx}
                                 onClick={(e) => {
                                   e.preventDefault()
                                   e.stopPropagation()
                                   setCurrentImageIndexes(prev => ({
                                     ...prev,
                                     [school.id]: idx
                                   }))
                                 }}
                                 className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                                   idx === currentIndex 
                                     ? 'bg-white' 
                                     : 'bg-white bg-opacity-50 hover:bg-opacity-70'
                                 }`}
                                 aria-label={`Go to image ${idx + 1}`}
                               />
                             ))}
                           </div>
                         )}
                       </div>
                     )
                   })()}
                 </div>

                {/* School Information */}
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
                    {school.name}
                  </h3>
                  
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-start">
                      <span className="text-gray-400 mr-2">📍</span>
                      <div>
                        <p className="line-clamp-2">{school.address}</p>
                        <p className="font-medium">{school.city}, {school.state}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <span className="text-gray-400 mr-2">📞</span>
                      <p>{school.contact}</p>
                    </div>
                    
                    <div className="flex items-center">
                      <span className="text-gray-400 mr-2">✉️</span>
                      <p className="truncate">{school.email_id}</p>
                    </div>
                  </div>
                </div>

                {/* School Card Footer */}
                <div className="px-4 py-3 bg-gray-50 border-t">
                  <p className="text-xs text-gray-500">
                    Added on {new Date(school.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
