import { useState } from 'react'
import ProfileCard from './ProfileCard'
import MapView from '../map/MapView'
import { AnimatePresence, motion } from 'framer-motion'

const ProfileGrid = ({ profiles }) => {
  const [selectedProfile, setSelectedProfile] = useState(null)
  const [showMap, setShowMap] = useState(false)
  
  const handleSummaryClick = (profile) => {
    setSelectedProfile(profile)
    setShowMap(true)
  }
  
  const handleCloseMap = () => {
    setShowMap(false)
    setSelectedProfile(null)
  }
  
  return (
    <div className="relative">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {profiles.map(profile => (
          <ProfileCard 
            key={profile.id} 
            profile={profile}
            onSummaryClick={() => handleSummaryClick(profile)} 
          />
        ))}
      </div>
      
      <AnimatePresence>
        {showMap && selectedProfile && (
          <motion.div 
            className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="bg-white rounded-lg w-full max-w-3xl overflow-hidden"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
            >
              <div className="p-4 bg-primary-600 text-white flex justify-between items-center">
                <h3 className="text-lg font-semibold">
                  {selectedProfile.name} - Location Summary
                </h3>
                <button 
                  onClick={handleCloseMap}
                  className="text-white hover:text-gray-200"
                >
                  ✕
                </button>
              </div>
              
              <div className="p-4">
                <div className="mb-4">
                  <h4 className="text-md font-medium text-gray-700">Address:</h4>
                  <p className="text-gray-600">
                    {selectedProfile.address.street}, {selectedProfile.address.city},<br />
                    {selectedProfile.address.state} {selectedProfile.address.zipCode}, {selectedProfile.address.country}
                  </p>
                </div>
                
                <MapView 
                  coordinates={selectedProfile.address.coordinates}
                  height="400px"
                  zoom={14}
                  showMarker={true}
                  markerTitle={selectedProfile.name}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default ProfileGrid