import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { Container, BodyWrapper, Body, List } from './styles';
import SearchManifestationsForm from '../../components/SearchManifestationsForm';
import Pagination from '../../components/Pagination';
import MapView from '../../components/MapView';
import ManifestationCard from '../../components/ManifestationCard';

export default function MapPage({
  manifestationsState,
  loadingState,
  pageState,
  maxPageState,
}) {
  const [page, setPage] = useState(pageState);
  const [maxPage] = useState(maxPageState);
  const [manifestations, setManifestations] = useState(manifestationsState);
  const [tags] = useState([
    { id: 1, title: 'banana' },
    { id: 2, title: 'maçã' },
    { id: 3, title: 'melancia' },
  ]);
  const [loading, setLoading] = useState(loadingState);

  useEffect(() => {
    // TODO função para pegar os dados da api
    setManifestations(manifestationsState);
  }, [manifestationsState]);

  function handleSubmit() {
    setLoading(true);
    // fazer a pesquisa
    setLoading(false);
  }

  return (
    <Container>
      <BodyWrapper>
        <Body>
          <SearchManifestationsForm
            onSubmit={handleSubmit}
            loading={loading}
            tagsOptions={tags}
          />

          <Pagination
            page={page}
            setPage={setPage}
            maxPage={maxPage}
            loading={loading}
          />

          <List>
            {manifestations &&
              manifestations.map(m => (
                <ManifestationCard key={m.id} manifestation={m} />
              ))}
          </List>
        </Body>

        {process.env.REACT_APP_MAPBOX_ACCESS_TOKEN ? (
          <MapView
            token={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
            manifestationsState={manifestations}
          />
        ) : (
          <section>Sem a chave de acesso ao mapa</section>
        )}
      </BodyWrapper>
    </Container>
  );
}

MapPage.propTypes = {
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
  loadingState: PropTypes.bool,
  pageState: PropTypes.number,
  maxPageState: PropTypes.number,
};

MapPage.defaultProps = {
  manifestationsState: [],
  loadingState: false,
  pageState: 1,
  maxPageState: 1,
};
