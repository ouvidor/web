import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import MapSearch from '../../components/MapSearch';
import MapView from '../../components/Map';
import { Container, BodyWrapper } from './styles';

export default function Map({ manifestationsState }) {
  const [manifestations, setManifestations] = useState(manifestationsState);

  useEffect(() => {
    // TODO função para pegar os dados da api
    setManifestations(manifestationsState);
  }, [manifestationsState]);

  return (
    <Container>
      <BodyWrapper>
        <MapSearch manifestations={manifestations} />
        <MapView
          token={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
          manifestationsState={manifestations}
        />
      </BodyWrapper>
    </Container>
  );
}

Map.propTypes = {
  manifestationsState: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      tags: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number,
          label: PropTypes.string,
        })
      ),
      upvotes: PropTypes.number,
    })
  ),
};

Map.defaultProps = {
  manifestationsState: [],
};
