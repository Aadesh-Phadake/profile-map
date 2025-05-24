import { useState, useEffect } from 'react'
import { FiSearch, FiFilter, FiX } from 'react-icons/fi'
import { motion, AnimatePresence } from 'framer-motion'
import { useProfiles } from '../context/ProfileContext'
import ProfileGrid from '../components/profile/ProfileGrid'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import Button from '../components/ui/Button'

const ProfilesPage = () => {
  const { profiles, loading, error } = useProfiles()
  const [searchTerm, setSearchTerm] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState({
    skills: [],
    location: '',
  })
  const [filteredProfiles, setFilteredProfiles] = useState([])
  
  // Extract all unique skills from profiles
  const allSkills = [...new Set(profiles.flatMap(profile => profile.skills))]
  
  // Extract all unique locations (cities) from profiles
  const allLocations = [...new Set(profiles.map(profile => profile.address.city))]
  
  // Toggle a skill filter
  const toggleSkillFilter = (skill) => {
    setFilters(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }))
  }
  
  // Set location filter
  const setLocationFilter = (location) => {
    setFilters(prev => ({
      ...prev,
      location: prev.location === location ? '' : location
    }))
  }
  
  // Clear all filters
  const clearFilters = () => {
    setFilters({
      skills: [],
      location: '',
    })
    setSearchTerm('')
  }
  
  // Apply search and filters to profiles
  useEffect(() => {
    if (loading) return
    
    let results = [...profiles]
    
    // Apply search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      results = results.filter(profile => 
        profile.name.toLowerCase().includes(term) ||
        profile.description.toLowerCase().includes(term) ||
        profile.company?.toLowerCase().includes(term) ||
        profile.address.city.toLowerCase().includes(term) ||
        profile.address.country.toLowerCase().includes(term)
      )
    }
    
    // Apply skill filters
    if (filters.skills.length > 0) {
      results = results.filter(profile => 
        filters.skills.some(skill => profile.skills.includes(skill))
      )
    }
    
    // Apply location filter
    if (filters.location) {
      results = results.filter(profile => 
        profile.address.city === filters.location
      )
    }
    
    setFilteredProfiles(results)
  }, [profiles, searchTerm, filters, loading])
  
  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <LoadingSpinner size="large" text="Loading profiles..." />
      </div>
    )
  }
  
  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-red-50 p-4 rounded-md border border-red-100 text-center">
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    )
  }
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Browse Profiles</h1>
        <p className="text-gray-600 mb-6">
          Explore professionals from various fields and locations. Click on a profile to view more details.
        </p>
        
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search Input */}
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name, description, or location..."
              className="block w-full rounded-md border-gray-300 pl-10 py-2 focus:ring-primary-500 focus:border-primary-500"
            />
            {searchTerm && (
              <button
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setSearchTerm('')}
              >
                <FiX className="h-5 w-5 text-gray-400 hover:text-gray-500" />
              </button>
            )}
          </div>
          
          {/* Filter Toggle */}
          <Button
            variant="secondary"
            onClick={() => setShowFilters(!showFilters)}
            icon={<FiFilter />}
            className="md:w-auto"
          >
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </Button>
        </div>
        
        {/* Filters */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden mt-4"
            >
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Filters</h3>
                  
                  <Button
                    variant="ghost"
                    size="small"
                    onClick={clearFilters}
                  >
                    Clear All
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Skills */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {allSkills.slice(0, 10).map(skill => (
                        <button
                          key={skill}
                          onClick={() => toggleSkillFilter(skill)}
                          className={`px-3 py-1 rounded-full text-sm ${
                            filters.skills.includes(skill)
                              ? 'bg-primary-100 text-primary-800 border border-primary-300'
                              : 'bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200'
                          }`}
                        >
                          {skill}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Locations */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Locations</h4>
                    <div className="flex flex-wrap gap-2">
                      {allLocations.map(location => (
                        <button
                          key={location}
                          onClick={() => setLocationFilter(location)}
                          className={`px-3 py-1 rounded-full text-sm ${
                            filters.location === location
                              ? 'bg-primary-100 text-primary-800 border border-primary-300'
                              : 'bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200'
                          }`}
                        >
                          {location}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Results count */}
      <p className="text-gray-600 mb-6">
        Showing {filteredProfiles.length} {filteredProfiles.length === 1 ? 'profile' : 'profiles'}
        {(searchTerm || filters.skills.length > 0 || filters.location) && ' with applied filters'}
      </p>
      
      {/* Profile Grid */}
      {filteredProfiles.length > 0 ? (
        <ProfileGrid profiles={filteredProfiles} />
      ) : (
        <div className="bg-white p-8 rounded-lg shadow-sm text-center">
          <p className="text-gray-500 mb-4">No profiles match your search criteria.</p>
          <Button 
            variant="secondary" 
            onClick={clearFilters}
          >
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  )
}

export default ProfilesPage