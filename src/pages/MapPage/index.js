import React, { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';

import { Container, BodyWrapper, Body, List, Scroll } from './styles';
import SearchManifestationsForm from '../../components/SearchManifestationsForm';
import Pagination from '../../components/Pagination';
import MapView from '../../components/MapView';
import ManifestationCard from '../../components/ManifestationCard';
import api from '../../services/api';
import { usePrevious } from '../../hooks';

export default function MapPage() {
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  const [manifestations, setManifestations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingPage, setLoadingPage] = useState(false);
  const [searchData, setSearchData] = useState({});
  const prevPage = usePrevious(page);
  const prevSearchData = usePrevious(searchData);

  // callback memoizado
  const fetchManifestations = useCallback(
    async setLoad => {
      setLoad(true);
      try {
        const response = await api.get(`manifestation`, {
          params: { ...searchData, page },
        });
        setManifestations(response.data.rows);
        setMaxPage(response.data.last_page);
      } catch (error) {
        toast.error('Não foi possivel buscar por manifestações');
      }
      setLoad(false);
    },
    [page, searchData]
  );

  useEffect(() => {
    if (prevPage !== page) {
      fetchManifestations(setLoadingPage);
    }
    if (prevSearchData !== searchData) {
      fetchManifestations(setLoading);
    }
  }, [fetchManifestations, searchData, page, prevPage, prevSearchData]);

  return (
    <Container>
      <BodyWrapper>
        <Body>
          <SearchManifestationsForm
            onSubmit={setSearchData}
            loading={loading}
          />

          <Pagination
            page={page}
            setPage={setPage}
            maxPage={maxPage}
            loading={loadingPage}
          />

          <Scroll>
            <List>
              {manifestations &&
                manifestations.map(m => (
                  <ManifestationCard
                    key={m.id}
                    manifestation={m}
                    handleClick={() => {}}
                  />
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
