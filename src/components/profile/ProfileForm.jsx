import { useState } from 'react'
import { useForm } from 'react-hook-form'
import Button from '../ui/Button'
import Input from '../ui/Input'
import { FiSave, FiX } from 'react-icons/fi'

const ProfileForm = ({ profile, onSubmit, onCancel }) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: profile || {
      name: '',
      photo: '',
      description: '',
      detailedDescription: '',
      address: {
        street: '',
        city: '',
        state: '',
        zipCode: '',
        country: '',
        coordinates: {
          lat: '',
          lng: ''
        }
      },
      skills: [],
      email: '',
      phone: '',
      company: '',
      website: '',
      socialMedia: {
        linkedin: '',
        github: '',
        twitter: ''
      }
    }
  })

  const onFormSubmit = async (data) => {
    setIsSubmitting(true)
    try {
      // Convert skills from string to array if needed
      if (typeof data.skills === 'string') {
        data.skills = data.skills.split(',').map(skill => skill.trim())
      }
      
      // Convert coordinates to numbers
      data.address.coordinates.lat = parseFloat(data.address.coordinates.lat)
      data.address.coordinates.lng = parseFloat(data.address.coordinates.lng)
      
      await onSubmit(data)
    } catch (error) {
      console.error('Error submitting form:', error)
    } finally {
      setIsSubmitting(false)
    }
  }
  
  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
      <div className="bg-white shadow-sm rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Basic Information</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Name"
            {...register('name', { required: 'Name is required' })}
            error={errors.name?.message}
          />
          
          <Input
            label="Photo URL"
            {...register('photo', { required: 'Photo URL is required' })}
            error={errors.photo?.message}
            placeholder="https://example.com/photo.jpg"
          />
        </div>
        
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Short Description
          </label>
          <textarea
            {...register('description', { required: 'Description is required' })}
            rows={2}
            className="block w-full rounded-md shadow-sm border-gray-300 focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
            placeholder="Brief description (1-2 sentences)"
          />
          {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>}
        </div>
        
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Detailed Description
          </label>
          <textarea
            {...register('detailedDescription')}
            rows={4}
            className="block w-full rounded-md shadow-sm border-gray-300 focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
            placeholder="More detailed description about the person"
          />
        </div>
        
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Skills (comma separated)
          </label>
          <input
            type="text"
            {...register('skills')}
            className="block w-full rounded-md shadow-sm border-gray-300 focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
            placeholder="JavaScript, React, Node.js, etc."
          />
        </div>
      </div>
      
      <div className="bg-white shadow-sm rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Contact Information</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Email"
            type="email"
            {...register('email', { 
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address'
              }
            })}
            error={errors.email?.message}
          />
          
          <Input
            label="Phone"
            {...register('phone')}
          />
          
          <Input
            label="Company"
            {...register('company')}
          />
          
          <Input
            label="Website"
            {...register('website')}
            placeholder="https://example.com"
          />
        </div>
        
        <h4 className="text-md font-medium text-gray-700 mt-4 mb-2">Social Media</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            label="LinkedIn"
            {...register('socialMedia.linkedin')}
            placeholder="username"
          />
          
          <Input
            label="GitHub"
            {...register('socialMedia.github')}
            placeholder="username"
          />
          
          <Input
            label="Twitter"
            {...register('socialMedia.twitter')}
            placeholder="username"
          />
        </div>
      </div>
      
      <div className="bg-white shadow-sm rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Address Information</h3>
        
        <div className="grid grid-cols-1 gap-4">
          <Input
            label="Street Address"
            {...register('address.street', { required: 'Street address is required' })}
            error={errors.address?.street?.message}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="City"
              {...register('address.city', { required: 'City is required' })}
              error={errors.address?.city?.message}
            />
            
            <Input
              label="State/Province"
              {...register('address.state', { required: 'State is required' })}
              error={errors.address?.state?.message}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Zip/Postal Code"
              {...register('address.zipCode', { required: 'Zip code is required' })}
              error={errors.address?.zipCode?.message}
            />
            
            <Input
              label="Country"
              {...register('address.country', { required: 'Country is required' })}
              error={errors.address?.country?.message}
            />
          </div>
          
          <h4 className="text-md font-medium text-gray-700 mt-2 mb-2">Map Coordinates</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Latitude"
              type="number"
              step="any"
              {...register('address.coordinates.lat', { 
                required: 'Latitude is required',
                valueAsNumber: true
              })}
              error={errors.address?.coordinates?.lat?.message}
            />
            
            <Input
              label="Longitude"
              type="number"
              step="any"
              {...register('address.coordinates.lng', { 
                required: 'Longitude is required',
                valueAsNumber: true
              })}
              error={errors.address?.coordinates?.lng?.message}
            />
          </div>
        </div>
      </div>
      
      <div className="flex justify-end space-x-3">
        <Button 
          type="button" 
          variant="secondary" 
          onClick={onCancel}
          icon={<FiX />}
        >
          Cancel
        </Button>
        <Button 
          type="submit" 
          variant="primary" 
          disabled={isSubmitting}
          icon={<FiSave />}
        >
          {isSubmitting ? 'Saving...' : 'Save Profile'}
        </Button>
      </div>
    </form>
  )
}

export default ProfileForm