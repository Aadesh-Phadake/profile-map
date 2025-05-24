import { createContext, useContext, useState, useEffect } from 'react'
import { mockProfiles } from '../data/mockData'

const ProfileContext = createContext()

export function useProfiles() {
  return useContext(ProfileContext)
}

export function ProfileProvider({ children }) {
  const [profiles, setProfiles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Load profiles from localStorage or use mock data
  useEffect(() => {
    const fetchProfiles = () => {
      setLoading(true)
      try {
        // Force using mock data by clearing localStorage
        localStorage.removeItem('profiles')
        setProfiles(mockProfiles)
        localStorage.setItem('profiles', JSON.stringify(mockProfiles))
        setError(null)
      } catch (err) {
        setError('Failed to load profiles. Please try again.')
        console.error('Error loading profiles:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchProfiles()
  }, [])

  // Save profiles to localStorage whenever they change
  useEffect(() => {
    if (profiles.length > 0) {
      localStorage.setItem('profiles', JSON.stringify(profiles))
    }
  }, [profiles])

  // Add a new profile
  const addProfile = (newProfile) => {
    const profileWithId = {
      ...newProfile,
      id: Date.now().toString(),
    }
    setProfiles(prevProfiles => [...prevProfiles, profileWithId])
    return profileWithId
  }

  // Update an existing profile
  const updateProfile = (id, updatedProfile) => {
    setProfiles(prevProfiles =>
      prevProfiles.map(profile =>
        profile.id === id ? { ...profile, ...updatedProfile } : profile
      )
    )
  }

  // Delete a profile
  const deleteProfile = (id) => {
    setProfiles(prevProfiles =>
      prevProfiles.filter(profile => profile.id !== id)
    )
  }

  // Get a single profile by ID
  const getProfileById = (id) => {
    return profiles.find(profile => profile.id === id) || null
  }

  const value = {
    profiles,
    loading,
    error,
    addProfile,
    updateProfile,
    deleteProfile,
    getProfileById,
  }

  return (
    <ProfileContext.Provider value={value}>
      {children}
    </ProfileContext.Provider>
  )
}