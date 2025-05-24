import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiMapPin, FiUsers, FiArrowRight } from 'react-icons/fi'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'

const HomePage = () => {
  const [hovered, setHovered] = useState(null)
  
  const features = [
    {
      id: 'browse',
      icon: <FiUsers className="h-10 w-10 text-primary-500" />,
      title: 'Browse Profiles',
      description: 'Explore a collection of profiles from various professionals and view their details.',
      link: '/profiles'
    },
    {
      id: 'map',
      icon: <FiMapPin className="h-10 w-10 text-primary-500" />,
      title: 'Interactive Map',
      description: 'Visualize profiles on an interactive map to see their geographic locations.',
      link: '/profiles'
    },
    {
      id: 'admin',
      icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-10 w-10 text-primary-500"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>,
      title: 'Manage Profiles',
      description: 'Add, edit, or remove profiles through an intuitive administrative interface.',
      link: '/admin'
    }
  ]
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <motion.h1 
          className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Welcome to <span className="text-primary-600">ProfileMap</span>
        </motion.h1>
        <motion.p 
          className="text-xl text-gray-600 max-w-3xl mx-auto mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Discover and explore profiles from professionals around the world.
          Visualize their locations and connect with them easily.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Link to="/profiles">
            <Button 
              variant="primary" 
              size="large"
              icon={<FiUsers />}
            >
              Browse Profiles
            </Button>
          </Link>
        </motion.div>
      </div>
      
      {/* Features Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Key Features</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
              onMouseEnter={() => setHovered(feature.id)}
              onMouseLeave={() => setHovered(null)}
            >
              <Card className="h-full p-6 flex flex-col">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 mb-6 flex-grow">{feature.description}</p>
                <Link to={feature.link} className="mt-auto">
                  <Button 
                    variant="secondary" 
                    fullWidth
                    icon={<FiArrowRight className={`transition-transform duration-300 ${hovered === feature.id ? 'translate-x-1' : ''}`} />}
                  >
                    {feature.id === 'browse' ? 'Browse Now' : feature.id === 'map' ? 'View Map' : 'Manage Profiles'}
                  </Button>
                </Link>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* About Section */}
      <motion.div 
        className="bg-white rounded-lg shadow-card p-8 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-4">About ProfileMap</h2>
        <p className="text-gray-600 max-w-3xl mx-auto">
          ProfileMap is a powerful application designed to help you visualize and manage
          professional profiles in a geographic context. Whether you're looking to connect with
          colleagues, find professionals in specific locations, or simply explore the network,
          ProfileMap provides an intuitive interface to do so.
        </p>
      </motion.div>
    </div>
  )
}

export default HomePage