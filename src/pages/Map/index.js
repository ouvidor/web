import React, { useState } from 'react';
import PropTypes from 'prop-types';

import FilterSearch from '../../components/FilterSearch';
import CardList from '../../components/CardList';
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
        {/* <MapView /> */}
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
