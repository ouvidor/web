/**
 * Wrapper Component para o componente ReactMapGL
 *
 */
import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import ReactMapGL from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

import { MapWrapper } from './styles';

export default function Map({ token, viewState }) {
  // TODO implementar o viewport no redux
  const containerRef = useRef();
  const [viewport, setViewPort] = useState(viewState);
  const [dimensions, setDimensions] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });

  useEffect(() => {
    function handleResize() {
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth,
      });
      console.log('Você mudou a dimensão');
    }
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });

  useEffect(() => {
    console.log(containerRef.current);
    setViewPort({
      ...viewport,
      width: containerRef.current.offsetWidth,
      height: containerRef.current.offsetHeight,
    });
  }, [containerRef.current, dimensions]);

  return (
    <MapWrapper ref={containerRef}>
      <ReactMapGL
        mapboxApiAccessToken={token}
        {...viewport}
        onViewportChange={view => setViewPort(view)}
      />
    </MapWrapper>
  );
}

Map.propTypes = {
  viewState: PropTypes.shape({
    width: PropTypes.number,
    height: PropTypes.number,
    latitude: PropTypes.number,
    longitude: PropTypes.number,
    zoom: PropTypes.number,
  }),
  token: PropTypes.string.isRequired,
};

Map.defaultProps = {
  viewState: {
    width: 0,
    height: 0,
    latitude: Number(process.env.REACT_APP_MAPBOX_LATITUDE),
    longitude: Number(process.env.REACT_APP_MAPBOX_LONGITUDE),
    zoom: Number(process.env.REACT_APP_MAPBOX_ZOOM),
  },
};
