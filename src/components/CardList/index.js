/**
 * Componente para gerenciar uma lista de manifestações
 */
import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Pagination from '../Pagination';

import { Container } from './styles';

export default function CardList({ pageState, maxPageState }) {
  // TODO receber manifestations
  // const [maxPage, setMaxPage] = useState(maxPageState);
  // const [manifestations, setManifestations] = useState(manifestations);
  const [page, setPage] = useState(pageState);

  return (
    <Container>
      <Pagination page={page} setPage={setPage} maxPageState={maxPageState} />
      {/* Lista de cards */}
    </Container>
  );
}

CardList.propTypes = {
  pageState: PropTypes.number,
  maxPageState: PropTypes.number,
};

CardList.defaultProps = { pageState: 1, maxPageState: 1 };
