import { FiMap, FiGithub, FiLinkedin, FiTwitter } from 'react-icons/fi'
import { motion } from 'framer-motion'

const Footer = () => {
  const year = new Date().getFullYear()
  
  return (
    <footer className="bg-white border-t border-gray-200 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <FiMap className="h-6 w-6 text-primary-600" />
            <span className="ml-2 text-lg font-semibold text-gray-900">ProfileMap</span>
          </div>
          
          <div className="flex space-x-6">
            <motion.a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              whileHover={{ y: -2 }}
              className="text-gray-500 hover:text-gray-700"
            >
              <FiGithub className="h-5 w-5" />
            </motion.a>
            <motion.a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer"
              whileHover={{ y: -2 }}
              className="text-gray-500 hover:text-gray-700"
            >
              <FiLinkedin className="h-5 w-5" />
            </motion.a>
            <motion.a 
              href="https://twitter.com" 
              target="_blank" 
              rel="noopener noreferrer"
              whileHover={{ y: -2 }}
              className="text-gray-500 hover:text-gray-700"
            >
              <FiTwitter className="h-5 w-5" />
            </motion.a>
          </div>
        </div>
        
        <div className="mt-8 border-t border-gray-200 pt-4">
          <p className="text-center text-sm text-gray-500">
            &copy; {year} ProfileMap. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer