import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiHome, FiUsers } from 'react-icons/fi'
import Button from '../components/ui/Button'

const NotFoundPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <motion.div 
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-9xl font-bold text-primary-500 mb-4">404</h1>
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">Page Not Found</h2>
        <p className="text-gray-600 max-w-md mx-auto mb-8">
          The page you are looking for might have been removed, had its name changed,
          or is temporarily unavailable.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link to="/">
            <Button 
              variant="primary" 
              icon={<FiHome />}
              fullWidth
            >
              Go to Home
            </Button>
          </Link>
          
          <Link to="/profiles">
            <Button 
              variant="secondary" 
              icon={<FiUsers />}
              fullWidth
            >
              Browse Profiles
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  )
}

export default NotFoundPage