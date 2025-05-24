import { useNavigate } from 'react-router-dom'
import { FiMapPin, FiMail, FiPhone, FiGlobe, FiLinkedin, FiGithub, FiTwitter, FiArrowLeft } from 'react-icons/fi'
import Button from '../ui/Button'
import MapView from '../map/MapView'
import { motion } from 'framer-motion'

const ProfileDetail = ({ profile }) => {
  const navigate = useNavigate()
  
  if (!profile) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl text-gray-600">Profile not found</h2>
        <Button 
          onClick={() => navigate('/profiles')}
          className="mt-4"
          variant="primary"
          icon={<FiArrowLeft />}
        >
          Back to Profiles
        </Button>
      </div>
    )
  }
  
  return (
    <div className="max-w-5xl mx-auto">
      <Button 
        onClick={() => navigate('/profiles')}
        className="mb-6"
        variant="secondary"
        icon={<FiArrowLeft />}
      >
        Back to Profiles
      </Button>
      
      <div className="bg-white rounded-lg shadow-card overflow-hidden">
        <div className="relative h-48 md:h-64 bg-primary-600">
          <img 
            src={profile.photo} 
            alt={profile.name}
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        </div>
        
        <div className="relative px-6 pb-6">
          <div className="flex flex-col md:flex-row">
            <div className="flex-1">
              <div className="-mt-12 md:-mt-16 mb-6">
                <motion.img 
                  src={profile.photo} 
                  alt={profile.name}
                  className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white object-cover shadow-md"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{profile.name}</h1>
                <p className="text-lg text-gray-600 mt-1">{profile.company}</p>
                
                <div className="mt-6">
                  <h2 className="text-lg font-semibold text-gray-900">About</h2>
                  <p className="mt-2 text-gray-700">{profile.detailedDescription || profile.description}</p>
                </div>
                
                <div className="mt-6">
                  <h2 className="text-lg font-semibold text-gray-900">Skills</h2>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {profile.skills.map(skill => (
                      <span 
                        key={skill}
                        className="px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
            
            <motion.div 
              className="mt-8 md:mt-0 md:ml-8 md:w-72 flex-shrink-0"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <div className="bg-gray-50 rounded-lg p-4">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h2>
                
                <div className="space-y-3">
                  <div className="flex items-center">
                    <FiMail className="text-gray-500 mr-3" />
                    <a href={`mailto:${profile.email}`} className="text-primary-600 hover:text-primary-800">
                      {profile.email}
                    </a>
                  </div>
                  
                  {profile.phone && (
                    <div className="flex items-center">
                      <FiPhone className="text-gray-500 mr-3" />
                      <a href={`tel:${profile.phone}`} className="text-primary-600 hover:text-primary-800">
                        {profile.phone}
                      </a>
                    </div>
                  )}
                  
                  {profile.website && (
                    <div className="flex items-center">
                      <FiGlobe className="text-gray-500 mr-3" />
                      <a 
                        href={profile.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-primary-600 hover:text-primary-800"
                      >
                        Website
                      </a>
                    </div>
                  )}
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <h3 className="text-md font-medium text-gray-900 mb-3">Social Media</h3>
                  
                  <div className="flex space-x-3">
                    {profile.socialMedia.linkedin && (
                      <a 
                        href={`https://linkedin.com/in/${profile.socialMedia.linkedin}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-500 hover:text-primary-600"
                      >
                        <FiLinkedin className="w-5 h-5" />
                      </a>
                    )}
                    
                    {profile.socialMedia.github && (
                      <a 
                        href={`https://github.com/${profile.socialMedia.github}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-500 hover:text-primary-600"
                      >
                        <FiGithub className="w-5 h-5" />
                      </a>
                    )}
                    
                    {profile.socialMedia.twitter && (
                      <a 
                        href={`https://twitter.com/${profile.socialMedia.twitter}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-500 hover:text-primary-600"
                      >
                        <FiTwitter className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="mt-6 bg-gray-50 rounded-lg p-4">
                <div className="flex items-start mb-2">
                  <FiMapPin className="mt-1 mr-2 text-gray-500" />
                  <div>
                    <h3 className="text-md font-medium text-gray-900">Address</h3>
                    <p className="text-gray-600 text-sm">
                      {profile.address.street}<br />
                      {profile.address.city}, {profile.address.state} {profile.address.zipCode}<br />
                      {profile.address.country}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
          
          <motion.div 
            className="mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
          >
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Location</h2>
            <MapView 
              coordinates={profile.address.coordinates}
              height="400px"
              zoom={14}
              showMarker={true}
              markerTitle={profile.name}
            />
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default ProfileDetail