/**
 * Wrapper Component para o componente ReactMapGL
 * Pega as variaveis de ambiente para definir o mapa para a cidade
 * Caso a tela seja aumentada o mapa tenta se adaptar, mas não consegue muito bem
 * Se a tela for aumentada e depois diminuida, só irá voltar ao normal se recarregar a página
 */
import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import ReactMapGL from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

import ManifestationPin from '../ManifestationPin';
import { MapWrapper } from './styles';

export default function Map({ token, viewState, manifestationState }) {
  // TODO implementar o viewport no redux
  const [manifestations] = useState(manifestationState);
  const containerRef = useRef();
  const [viewport, setViewPort] = useState(viewState);
  const [style] = useState('mapbox://styles/rihor/ck0gyxxik03gv1cmqneje52e9');

  // atualizar a viewport de acordo com o tamanho da tela
  useEffect(() => {
    setViewPort({
      ...viewport,
      width: containerRef.current.offsetWidth,
      height: containerRef.current.offsetHeight,
    });
    // eslint-disable-next-line
  }, [containerRef.current, window.innerHeight, window.innerWidth]);

  return (
    <MapWrapper ref={containerRef}>
      <ReactMapGL
        mapStyle={style}
        mapboxApiAccessToken={token}
        {...viewport}
        onViewportChange={view => setViewPort(view)}
      >
        {manifestations &&
          manifestations.map(m => <ManifestationPin marker={m} />)}
      </ReactMapGL>
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
  manifestationState: PropTypes.arrayOf(
    PropTypes.shape({
      latitude: PropTypes.number,
      longitude: PropTypes.number,
    })
  ),
};

Map.defaultProps = {
  viewState: {
    width: 0,
    height: 0,
    latitude: Number(process.env.REACT_APP_MAPBOX_LATITUDE),
    longitude: Number(process.env.REACT_APP_MAPBOX_LONGITUDE),
    zoom: Number(process.env.REACT_APP_MAPBOX_ZOOM),
  },
  manifestationState: [],
};
