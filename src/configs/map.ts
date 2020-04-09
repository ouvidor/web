const googleMapsConfig = {
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_KEY,
  initialPlace: {
    latitude: Number(process.env.REACT_APP_GOOGLE_MAPS_LATITUDE),
    longitude: Number(process.env.REACT_APP_GOOGLE_MAPS_LONGITUDE),
    zoom: Number(process.env.REACT_APP_GOOGLE_MAPS_ZOOM),
  },
}

export default googleMapsConfig
