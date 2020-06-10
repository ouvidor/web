import React from "react"
import {
  GoogleMap,
  LoadScript,
  Marker,
  GoogleMapProps,
} from "@react-google-maps/api"

import mapsConfig from "../../configs/map"
import mapsStyle from "../../styles/map.json"

interface Props extends GoogleMapProps {
  items?: IManifestation[]
  selectItem?(item: IManifestation): void
}

const libraries = ["visualization"]

const MapView: React.FC<Props> = ({ items, selectItem, children }) => {
  const { apiKey, initialPlace } = mapsConfig

  const center = {
    lat: initialPlace.latitude,
    lng: initialPlace.longitude,
  }

  return (
    <LoadScript googleMapsApiKey={apiKey} libraries={libraries}>
      <GoogleMap
        mapContainerStyle={{
          height: "100%",
          width: "100%",
        }}
        zoom={initialPlace.zoom}
        center={center}
        options={{ styles: mapsStyle }}
      >
        {items &&
          items.map((item) => (
            <Marker
              key={item.id}
              position={{
                lat: Number(item.latitude),
                lng: Number(item.longitude),
              }}
              onClick={() => {
                if (selectItem) {
                  selectItem(item)
                }
              }}
            />
          ))}
        {children}
      </GoogleMap>
    </LoadScript>
  )
}

export default MapView
