import { useState } from 'react'
import { motion } from 'framer-motion'
import { useProfiles } from '../context/ProfileContext'
import AdminProfileList from '../components/admin/AdminProfileList'
import ProfileForm from '../components/profile/ProfileForm'
import LoadingSpinner from '../components/ui/LoadingSpinner'

const AdminPage = () => {
  const { profiles, loading, addProfile, updateProfile, deleteProfile, getProfileById } = useProfiles()
  const [isEditing, setIsEditing] = useState(false)
  const [currentProfileId, setCurrentProfileId] = useState(null)
  const [showForm, setShowForm] = useState(false)
  
  const handleAddClick = () => {
    setCurrentProfileId(null)
    setIsEditing(false)
    setShowForm(true)
  }
  
  const handleEditClick = (id) => {
    setCurrentProfileId(id)
    setIsEditing(true)
    setShowForm(true)
  }
  
  const handleDeleteClick = (id) => {
    deleteProfile(id)
  }
  
  const handleFormSubmit = async (data) => {
    if (isEditing && currentProfileId) {
      await updateProfile(currentProfileId, data)
    } else {
      await addProfile(data)
    }
    setShowForm(false)
  }
  
  const handleFormCancel = () => {
    setShowForm(false)
  }
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
        <p className="text-gray-600">
          Manage profiles, add new professionals, or update existing information.
        </p>
      </div>
      
      {showForm ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
        >
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              {isEditing ? 'Edit Profile' : 'Add New Profile'}
            </h2>
            
            <ProfileForm 
              profile={isEditing ? getProfileById(currentProfileId) : null}
              onSubmit={handleFormSubmit}
              onCancel={handleFormCancel}
            />
          </div>
        </motion.div>
      ) : (
        <AdminProfileList 
          profiles={profiles}
          loading={loading}
          onEdit={handleEditClick}
          onDelete={handleDeleteClick}
          onAdd={handleAddClick}
        />
      )}
    </div>
  )
}

export default AdminPage