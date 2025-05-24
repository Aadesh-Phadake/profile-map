import { motion } from 'framer-motion'
import { FiMapPin, FiInfo } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import Button from '../ui/Button'

const ProfileCard = ({ profile, onSummaryClick }) => {
  if (!profile) return null
  
  return (
    <motion.div 
      className="bg-white rounded-lg shadow-card overflow-hidden h-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
    >
      <div className="relative">
        <img 
          src={profile.photo} 
          alt={profile.name} 
          className="w-full h-48 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-4">
          <h3 className="text-xl font-bold text-white">{profile.name}</h3>
        </div>
      </div>
      
      <div className="p-4">
        <p className="text-gray-600 mb-4">{profile.description}</p>
        
        <div className="flex items-start text-gray-500 mb-4">
          <FiMapPin className="mt-1 mr-1 flex-shrink-0" />
          <span className="text-sm">
            {profile.address.city}, {profile.address.state}, {profile.address.country}
          </span>
        </div>
        
        <div className="flex flex-wrap gap-1 mb-4">
          {profile.skills.slice(0, 3).map(skill => (
            <span 
              key={skill} 
              className="px-2 py-1 bg-primary-50 text-primary-700 rounded-full text-xs"
            >
              {skill}
            </span>
          ))}
          {profile.skills.length > 3 && (
            <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
              +{profile.skills.length - 3}
            </span>
          )}
        </div>
        
        <div className="flex space-x-2 mt-auto">
          <Button 
            variant="secondary" 
            size="small" 
            onClick={onSummaryClick}
            className="flex-1"
            icon={<FiMapPin />}
          >
            Summary
          </Button>
          
          <Link to={`/profiles/${profile.id}`} className="flex-1">
            <Button 
              variant="primary" 
              size="small" 
              fullWidth
              icon={<FiInfo />}
            >
              Details
            </Button>
          </Link>
        </div>
      </div>
    </motion.div>
  )
}

export default ProfileCard