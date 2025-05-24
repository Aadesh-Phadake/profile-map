import { motion } from 'framer-motion'

const LoadingSpinner = ({ size = 'medium', text = 'Loading...' }) => {
  const sizeClasses = {
    small: 'w-4 h-4 border-2',
    medium: 'w-8 h-8 border-3',
    large: 'w-12 h-12 border-4'
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <motion.div
        className={`${sizeClasses[size]} rounded-full border-t-primary-500 border-r-primary-200 border-b-primary-200 border-l-primary-200`}
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          ease: "linear",
          repeat: Infinity
        }}
      />
      {text && <p className="mt-2 text-sm text-gray-600">{text}</p>}
    </div>
  )
}

export default LoadingSpinner