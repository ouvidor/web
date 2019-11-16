import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { toast } from 'react-toastify';
import { Container, BodyWrapper, Body, List, Scroll } from './styles';
import SearchManifestationsForm from '../../components/SearchManifestationsForm';
import Pagination from '../../components/Pagination';
import MapView from '../../components/MapView';
import ManifestationCard from '../../components/ManifestationCard';
import api from '../../services/api';

export default function MapPage({
  manifestationsState,
  loadingState,
  pageState,
  maxPageState,
}) {
  const [page, setPage] = useState(pageState);
  const [maxPage] = useState(maxPageState);
  const [manifestations, setManifestations] = useState(manifestationsState);
  const [loading, setLoading] = useState(loadingState);

  useEffect(() => {
    // TODO função para pegar os dados da api
    setManifestations(manifestationsState);
  }, [manifestationsState]);

  async function handleSubmit(data) {
    setLoading(true);
    try {
      const response = await api.get(`manifestation`, {
        params: { ...data, page },
      });
      setManifestations(response.data);
    } catch (error) {
      toast.error('Não foi possivel buscar por manifestações');
    }
    setLoading(false);
  }

  return (
    <Container>
      <BodyWrapper>
        <Body>
          <SearchManifestationsForm onSubmit={handleSubmit} loading={loading} />

          <Pagination
            page={page}
            setPage={setPage}
            maxPage={maxPage}
            loading={loading}
          />

          <Scroll>
            <List>
              {manifestations &&
                manifestations.map(m => (
                  <ManifestationCard key={m.id} manifestation={m} />
                ))}
            </List>
          </Scroll>
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
