import React, { useState } from 'react';
import PropTypes from 'prop-types';
import FilterSearch from '../../components/FilterSearch';
import CardList from '../../components/CardList';
import MapView from '../../components/Map';
import { Container, BodyWrapper } from './styles';

export default function Map({ cardsState }) {
  const [cards, setCards] = useState(cardsState);

  // TODO função para pegar os dados da api

  return (
    <Container>
      <FilterSearch />
      <BodyWrapper>
        {/* TODO area com draggable */}
        <CardList cardsState={cards} setCards={setCards} />
        <MapView token={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN} />
      </BodyWrapper>
    </Container>
  );
}

Map.propTypes = {
  cardsState: PropTypes.arrayOf(PropTypes.object),
};

Map.defaultProps = {
  cardsState: [],
};
