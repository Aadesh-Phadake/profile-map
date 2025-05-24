import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useProfiles } from '../context/ProfileContext'
import ProfileDetail from '../components/profile/ProfileDetail'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import Button from '../components/ui/Button'
import { FiArrowLeft } from 'react-icons/fi'

const ProfileDetailsPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { getProfileById, loading } = useProfiles()
  const [profile, setProfile] = useState(null)
  const [notFound, setNotFound] = useState(false)
  
  useEffect(() => {
    if (!loading) {
      const foundProfile = getProfileById(id)
      if (foundProfile) {
        setProfile(foundProfile)
        setNotFound(false)
      } else {
        setNotFound(true)
      }
    }
  }, [id, getProfileById, loading])
  
  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <LoadingSpinner size="large" text="Loading profile..." />
      </div>
    )
  }
  
  if (notFound) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center py-12 bg-white rounded-lg shadow-sm">
          <h2 className="text-2xl text-gray-700 mb-4">Profile Not Found</h2>
          <p className="text-gray-600 mb-6">
            The profile you're looking for doesn't exist or has been removed.
          </p>
          <Button 
            onClick={() => navigate('/profiles')}
            variant="primary"
            icon={<FiArrowLeft />}
          >
            Back to Profiles
          </Button>
        </div>
      </div>
    )
  }
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <ProfileDetail profile={profile} />
    </div>
  )
}

export default ProfileDetailsPage