import { motion } from 'framer-motion'

const Card = ({ 
  children, 
  className = '', 
  onClick, 
  elevation = 'medium',
  hover = true,
  ...props 
}) => {
  const elevationClasses = {
    low: 'shadow-sm',
    medium: 'shadow',
    high: 'shadow-md'
  }

  const hoverClasses = hover ? 'hover:shadow-lg transition-shadow duration-200' : ''
  
  return (
    <motion.div
      className={`bg-white rounded-lg overflow-hidden ${elevationClasses[elevation]} ${hoverClasses} ${className}`}
      onClick={onClick}
      whileHover={hover ? { y: -4 } : {}}
      transition={{ duration: 0.2 }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export default Card