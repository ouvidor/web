/**
 * Componente para gerenciar uma lista de manifestações
 */
import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Pagination from '../Pagination';
import ManifestationCard from '../ManifestationCard';

import { Container } from './styles';

export default function CardList({ pageState, maxPageState, manifestations }) {
  // TODO receber manifestations
  // const [maxPage, setMaxPage] = useState(maxPageState);
  const [page, setPage] = useState(pageState);

  return (
    <Container>
      <Pagination page={page} setPage={setPage} maxPageState={maxPageState} />
      <ul>
        {manifestations &&
          manifestations.map(manifestation => (
            <ManifestationCard
              key={manifestation.id}
              manifestation={manifestation}
            />
          ))}
      </ul>
    </Container>
  );
}

CardList.propTypes = {
  pageState: PropTypes.number,
  maxPageState: PropTypes.number,
  manifestations: PropTypes.arrayOf(
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

CardList.defaultProps = { pageState: 1, maxPageState: 1, manifestations: [] };
