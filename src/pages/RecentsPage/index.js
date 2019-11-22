import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { MdClear } from 'react-icons/md';

import SearchManifestationsForm from '../../components/SearchManifestationsForm';
import Pagination from '../../components/Pagination';
import api from '../../services/api';
import { Background } from '../../styles';
import {
  Container,
  ManifestationList,
  ManifestationContainer,
  NoSelectedContainer,
  Grid,
} from './styles';
import ManifestationCard from '../../components/ManifestationCard';
import Manifestation from '../../components/Manifestation';

export default function RecentsPage() {
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [loadingPage, setLoadingPage] = useState(false);
  const [searchData, setSearchData] = useState({});
  const [manifestations, setManifestations] = useState([]);
  const [selected, setSelected] = useState(null);

  function handleClick(manifestation) {
    setSelected(manifestation);
  }

  async function handleSubmit() {
    try {
      // passa isRead: 0, para pegar as manifestações que não foram lidas
      const response = await api.get(`manifestation`, {
        params: { ...searchData, page, isRead: 0 },
      });

      setManifestations(response.data.rows);
      setMaxPage(response.data.last_page);
    } catch (error) {
      toast.error('Não foi possivel buscar por manifestações');
    }
  }

  // quando pesquisa
  useEffect(() => {
    async function fetchManifestations() {
      setLoading(true);
      await handleSubmit();
      setLoading(false);
    }

    fetchManifestations();
  }, [searchData]);

  // quando passa a página
  useEffect(() => {
    async function fetchNextPage() {
      setLoadingPage(true);
      await handleSubmit();
      setLoadingPage(false);
    }

    fetchNextPage();
  }, [page]);

  return (
    <Background>
      <Container>
        <header>
          <h1>Novas manifestações</h1>
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
        </header>

        <Grid>
          <ManifestationList>
            {manifestations &&
              manifestations.map(m => (
                <ManifestationCard
                  key={m.id}
                  manifestation={m}
                  handleClick={() => handleClick(m)}
                />
              ))}
          </ManifestationList>

          <ManifestationContainer>
            {selected ? (
              <Manifestation manifestation={selected} />
            ) : (
              <NoSelectedContainer>
                <MdClear />
                <p>Nenhuma manifestação selecionada</p>
              </NoSelectedContainer>
            )}
          </ManifestationContainer>
        </Grid>
      </Container>
    </Background>
  );
}
