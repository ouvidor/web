import React from "react"
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api"

import mapsConfig from "../../configs/map"
import mapsStyle from "../../styles/map.json"

type Props = {
  items: IManifestation[]
  selectItem(item: IManifestation): void
}

function MapView({ items, selectItem }: Props) {
  const { apiKey, initialPlace } = mapsConfig

  return (
    <LoadScript googleMapsApiKey={apiKey}>
      <GoogleMap
        // onLoad={(map) => {
        //   console.log(map);
        // }}
        mapContainerStyle={{
          height: "100%",
          width: "100%",
        }}
        zoom={initialPlace.zoom}
        center={{
          lat: initialPlace.latitude,
          lng: initialPlace.longitude,
        }}
        options={{ styles: mapsStyle }}
      >
        {items.map((item) => (
          <Marker
            key={item.id}
            position={{
              lat: Number(item.latitude),
              lng: Number(item.longitude),
            }}
            onClick={() => selectItem(item)}
          />
        ))}
      </GoogleMap>
    </LoadScript>
  )
}

export default MapView
