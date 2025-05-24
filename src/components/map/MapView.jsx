import { useState, useCallback } from 'react'
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api'
import LoadingSpinner from '../ui/LoadingSpinner'

const MapView = ({ 
  coordinates, 
  height = '400px', 
  zoom = 12, 
  showMarker = true, 
  markerTitle = '',
  onMapLoad
}) => {
  // Note: In a production app, you would want to set up a proper API key
  // and restrict it appropriately. For this demo, we'll use a placeholder.
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || 'YOUR_GOOGLE_MAPS_API_KEY',
  })
  
  const [map, setMap] = useState(null)
  
  const onLoad = useCallback((map) => {
    setMap(map)
    if (onMapLoad) onMapLoad(map)
  }, [onMapLoad])
  
  const onUnmount = useCallback(() => {
    setMap(null)
  }, [])

  // Custom marker icon configuration
  const markerIcon = {
    path: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z",
    fillColor: "#DC2626", // Tailwind's red-600
    fillOpacity: 1,
    strokeWeight: 1,
    strokeColor: "#991B1B", // Tailwind's red-800
    scale: 2,
    anchor: { x: 12, y: 24 }
  }
  
  if (loadError) {
    return (
      <div className="bg-red-50 p-4 rounded-md border border-red-100">
        <p className="text-red-600">
          Error loading maps. Please check your API key or try again later.
        </p>
      </div>
    )
  }
  
  if (!isLoaded) {
    return (
      <div className="flex justify-center items-center" style={{ height }}>
        <LoadingSpinner text="Loading map..." />
      </div>
    )
  }
  
  return (
    <div className="rounded-lg overflow-hidden" style={{ height }}>
      <GoogleMap
        mapContainerStyle={{ width: '100%', height: '100%' }}
        center={coordinates}
        zoom={zoom}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={{
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: true,
          zoomControl: true,
          styles: [
            {
              featureType: 'poi',
              elementType: 'labels',
              stylers: [{ visibility: 'off' }]
            }
          ]
        }}
      >
        {showMarker && (
          <Marker
            position={coordinates}
            title={markerTitle}
            icon={markerIcon}
            animation={window.google?.maps.Animation.DROP}
          />
        )}
      </GoogleMap>
    </div>
  )
}

export default MapView