import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import SearchManifestationsForm from '../../components/SearchManifestationsForm';
import Pagination from '../../components/Pagination';
import api from '../../services/api';
import { Background } from '../../styles';
import { Container, ManifestationList } from './styles';
import ManifestationCard from '../../components/ManifestationCard';

export default function RecentsPage() {
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  const [manifestations, setManifestations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingPage, setLoadingPage] = useState(false);
  const [searchData, setSearchData] = useState({});

  async function handleSubmit() {
    try {
      const response = await api.get(`manifestation`, {
        params: { ...searchData, page },
      });

      // pega apenas as manifestações que não foram lidas
      const filteredManifestations = response.data.rows.filter(m => !m.read);

      setManifestations(filteredManifestations);
      setMaxPage(response.data.last_page);
    } catch (error) {
      toast.error('Não foi possivel buscar por manifestações');
    }
  }

  useEffect(() => {
    async function fetchManifestations() {
      setLoading(true);
      await handleSubmit();
      setLoading(false);
    }

    fetchManifestations();
  }, [searchData]);

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
        </header>

        <section>
          <Pagination
            page={page}
            setPage={setPage}
            maxPage={maxPage}
            loading={loadingPage}
          />
          <ManifestationList>
            {manifestations &&
              manifestations.map(m => (
                <ManifestationCard key={m.id} manifestation={m} />
              ))}
          </ManifestationList>
        </section>
      </Container>
    </Background>
  );
}
