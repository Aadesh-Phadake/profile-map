import { useState } from 'react'
import { FiEdit2, FiTrash2, FiPlus } from 'react-icons/fi'
import { motion, AnimatePresence } from 'framer-motion'
import Button from '../ui/Button'
import LoadingSpinner from '../ui/LoadingSpinner'

const AdminProfileList = ({ profiles, onEdit, onDelete, onAdd, loading }) => {
  const [confirmDelete, setConfirmDelete] = useState(null)
  
  const handleDeleteClick = (id) => {
    setConfirmDelete(id)
  }
  
  const handleConfirmDelete = () => {
    if (confirmDelete) {
      onDelete(confirmDelete)
      setConfirmDelete(null)
    }
  }
  
  const handleCancelDelete = () => {
    setConfirmDelete(null)
  }
  
  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <LoadingSpinner size="large" text="Loading profiles..." />
      </div>
    )
  }
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Manage Profiles</h2>
        <Button 
          onClick={onAdd}
          variant="primary"
          icon={<FiPlus />}
        >
          Add New Profile
        </Button>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Profile
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {profiles.length === 0 ? (
                <tr>
                  <td colSpan="4" className="px-6 py-8 text-center text-gray-500">
                    No profiles found. Add a new profile to get started.
                  </td>
                </tr>
              ) : (
                profiles.map((profile) => (
                  <motion.tr 
                    key={profile.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    layout
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img 
                            className="h-10 w-10 rounded-full object-cover" 
                            src={profile.photo} 
                            alt={profile.name}
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{profile.name}</div>
                          <div className="text-sm text-gray-500">{profile.company}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{profile.address.city}, {profile.address.state}</div>
                      <div className="text-sm text-gray-500">{profile.address.country}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{profile.email}</div>
                      <div className="text-sm text-gray-500">{profile.phone}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <Button
                          variant="secondary"
                          size="small"
                          onClick={() => onEdit(profile.id)}
                          icon={<FiEdit2 className="w-4 h-4" />}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="danger"
                          size="small"
                          onClick={() => handleDeleteClick(profile.id)}
                          icon={<FiTrash2 className="w-4 h-4" />}
                        >
                          Delete
                        </Button>
                      </div>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      <AnimatePresence>
        {confirmDelete && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-lg p-6 max-w-md w-full"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
            >
              <h3 className="text-lg font-medium text-gray-900 mb-3">Confirm Deletion</h3>
              <p className="text-gray-600 mb-4">
                Are you sure you want to delete this profile? This action cannot be undone.
              </p>
              <div className="flex justify-end space-x-3">
                <Button
                  variant="secondary"
                  onClick={handleCancelDelete}
                >
                  Cancel
                </Button>
                <Button
                  variant="danger"
                  onClick={handleConfirmDelete}
                >
                  Delete
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default AdminProfileList