import React from 'react';
import PropTypes from 'prop-types';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

import mapsConfig from '../../configs/map';
import mapsStyle from '../../styles/map.json';

function MapView({ items, selectItem }) {
  const { apiKey, initialPlace } = mapsConfig;

  return (
    <LoadScript googleMapsApiKey={apiKey}>
      <GoogleMap
        // onLoad={(map) => {
        //   console.log(map);
        // }}
        mapContainerStyle={{
          height: '100%',
          width: '100%',
        }}
        zoom={initialPlace.zoom}
        center={{
          lat: initialPlace.latitude,
          lng: initialPlace.longitude,
        }}
        options={{ styles: mapsStyle }}
      >
        {items.map(item => (
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
  );
}

MapView.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  selectItem: PropTypes.func.isRequired,
};

export default MapView;
