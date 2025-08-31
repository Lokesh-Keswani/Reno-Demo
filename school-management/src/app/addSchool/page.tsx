'use client'

import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface SchoolFormData {
  name: string
  address: string
  city: string
  state: string
  contact: string
  email_id: string
  images: FileList
}

export default function AddSchool() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')
  const [selectedImages, setSelectedImages] = useState<string[]>([])
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<SchoolFormData>()

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      const newFiles = Array.from(files)
      const newImagePromises = newFiles.map((file) => {
        return new Promise<string>((resolve) => {
          const reader = new FileReader()
          reader.onload = (event) => {
            resolve(event.target?.result as string)
          }
          reader.readAsDataURL(file)
        })
      })

      Promise.all(newImagePromises).then((newImages) => {
        setSelectedImages(prev => [...prev, ...newImages])
        setSelectedFiles(prev => [...prev, ...newFiles])
      })
    }
    
    // Reset the input value so the same file can be selected again
    e.target.value = ''
  }

  const removeImage = (index: number) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index))
    setSelectedFiles(prev => prev.filter((_, i) => i !== index))
  }

  const clearAllImages = () => {
    setSelectedImages([])
    setSelectedFiles([])
  }

  const onSubmit = async (data: SchoolFormData) => {
    setIsSubmitting(true)
    setSubmitMessage('')

    try {
      const formData = new FormData()
      formData.append('name', data.name)
      formData.append('address', data.address)
      formData.append('city', data.city)
      formData.append('state', data.state)
      formData.append('contact', data.contact)
      formData.append('email_id', data.email_id)
      
      if (selectedFiles && selectedFiles.length > 0) {
        selectedFiles.forEach((image, index) => {
          formData.append(`image_${index}`, image)
        })
        formData.append('imageCount', selectedFiles.length.toString())
      }

      const response = await fetch('/api/schools', {
        method: 'POST',
        body: formData,
      })

      const result = await response.json()

      if (result.success) {
        setSubmitMessage('School added successfully!')
        reset()
        setSelectedImages([])
        setSelectedFiles([])
        setTimeout(() => {
          router.push('/showSchools')
        }, 2000)
      } else {
        setSubmitMessage('Error adding school. Please try again.')
      }
    } catch (error) {
      setSubmitMessage('Error adding school. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
          Add New School
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* School Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              School Name *
            </label>
            <input
              {...register('name', { 
                required: 'School name is required',
                minLength: { value: 2, message: 'School name must be at least 2 characters' }
              })}
              type="text"
              id="name"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-black"
              placeholder="Enter school name"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>

          {/* Address */}
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
              Address *
            </label>
            <textarea
              {...register('address', { 
                required: 'Address is required',
                minLength: { value: 10, message: 'Address must be at least 10 characters' }
              })}
              id="address"
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-black"
              placeholder="Enter complete address"
            />
            {errors.address && (
              <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>
            )}
          </div>

          {/* City and State */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
                City *
              </label>
              <input
                {...register('city', { 
                  required: 'City is required',
                  minLength: { value: 2, message: 'City must be at least 2 characters' }
                })}
                type="text"
                id="city"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-black"
                placeholder="Enter city"
              />
              {errors.city && (
                <p className="mt-1 text-sm text-red-600">{errors.city.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-2">
                State *
              </label>
              <input
                {...register('state', { 
                  required: 'State is required',
                  minLength: { value: 2, message: 'State must be at least 2 characters' }
                })}
                type="text"
                id="state"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-black"
                placeholder="Enter state"
              />
              {errors.state && (
                <p className="mt-1 text-sm text-red-600">{errors.state.message}</p>
              )}
            </div>
          </div>

          {/* Contact */}
          <div>
            <label htmlFor="contact" className="block text-sm font-medium text-gray-700 mb-2">
              Contact Number *
            </label>
            <input
              {...register('contact', { 
                required: 'Contact number is required',
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: 'Please enter a valid 10-digit contact number'
                }
              })}
              type="tel"
              id="contact"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-black"
              placeholder="Enter 10-digit contact number"
            />
            {errors.contact && (
              <p className="mt-1 text-sm text-red-600">{errors.contact.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email_id" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address *
            </label>
            <input
              {...register('email_id', { 
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Please enter a valid email address'
                }
              })}
              type="email"
              id="email_id"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-black"
              placeholder="Enter email address"
            />
            {errors.email_id && (
              <p className="mt-1 text-sm text-red-600">{errors.email_id.message}</p>
            )}
          </div>

          {/* Multiple Images Upload */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label htmlFor="images" className="block text-sm font-medium text-gray-700">
                School Images
              </label>
              {selectedImages.length > 0 && (
                <button
                  type="button"
                  onClick={clearAllImages}
                  className="text-red-600 hover:text-red-700 text-sm font-medium"
                >
                  Clear All
                </button>
              )}
            </div>
            
            <input
              type="file"
              id="images"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            <p className="mt-1 text-sm text-gray-500">
              Upload school images (optional). You can select one or multiple images at once. Use this input multiple times to keep adding more images.
            </p>

            {selectedImages.length > 0 && (
              <div className="mt-4">
                <div className="flex justify-between items-center mb-2">
                  <p className="text-sm text-gray-600">
                    Selected images ({selectedImages.length} image{selectedImages.length !== 1 ? 's' : ''}):
                  </p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {selectedImages.map((image, index) => (
                    <div key={index} className="relative group">
                      <img 
                        src={image} 
                        alt={`Selected school image ${index + 1}`} 
                        className="w-full h-24 object-cover rounded-md border border-gray-300"
                      />
                      
                      {/* Image number */}
                      <div className="absolute top-1 left-1 bg-black bg-opacity-70 text-white text-xs px-1.5 py-0.5 rounded">
                        {index + 1}
                      </div>
                      
                      {/* Remove button */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          removeImage(index)
                        }}
                        className="absolute top-1 right-1 w-8 h-8 flex items-center justify-center text-red-500 hover:text-red-700 opacity-70 group-hover:opacity-100 hover:opacity-100 transition-all duration-200 text-xl font-bold cursor-pointer z-10"
                        aria-label={`Remove image ${index + 1}`}
                      >
                        ×
                      </button>
                      
                      {/* Hover tint overlay */}
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-200 rounded-md">
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <p className="mt-2 text-sm text-gray-500">
              Select images one at a time or multiple at once. Use the same input repeatedly to keep adding more. Hover over any image and click the red × to remove it.
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed font-medium text-lg transition-colors"
          >
            {isSubmitting ? 'Adding School...' : 'Add School'}
          </button>

          {/* Success/Error Message */}
          {submitMessage && (
            <div className={`text-center p-3 rounded-md ${
              submitMessage.includes('successfully') 
                ? 'bg-green-100 text-green-700' 
                : 'bg-red-100 text-red-700'
            }`}>
              {submitMessage}
            </div>
          )}
        </form>
      </div>
    </div>
  )
}
