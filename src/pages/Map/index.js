import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import FilterSearch from '../../components/FilterSearch';
import CardList from '../../components/CardList';
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
      <FilterSearch />
      <BodyWrapper>
        {/* TODO area com draggable */}
        <CardList manifestations={manifestations} />
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
