import React, { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';
import { MdClear } from 'react-icons/md';

import { Background } from '../../styles';
import {
  Container,
  ManifestationList,
  ManifestationContainer,
  NoSelectedContainer,
  Grid,
} from './styles';
import SearchManifestationsForm from '../../components/SearchManifestationsForm';
import Pagination from '../../components/Pagination';
import ManifestationCard from '../../components/ManifestationCard';
import Manifestation from '../../components/Manifestation';
import Api from '../../services/api';
import { usePrevious } from '../../hooks';

export default function RecentsPage() {
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [loadingPage, setLoadingPage] = useState(false);
  const [searchData, setSearchData] = useState({});
  const [manifestations, setManifestations] = useState([]);
  const [selected, setSelected] = useState(null);
  const prevPage = usePrevious(page);
  const prevSearchData = usePrevious(searchData);

  function handleClick(manifestation) {
    setSelected(manifestation);
  }

  // callback memoizado
  const fetchManifestations = useCallback(
    async setLoad => {
      setLoad(true);

      // pegando apenas o titulo das opções
      let formattedData;
      if (searchData.options) {
        formattedData = {
          text: searchData.text,
          options: searchData.options.map(option => option.title),
        };
      }

      try {
        // passa isRead: 0, para pegar as manifestações que não foram lidas
        const data = await Api.get({
          pathUrl: 'manifestation',
          params: { ...formattedData, page, isRead: 0 },
        });

        setManifestations(data.rows);
        setMaxPage(data.last_page);
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
      setPage(1);
      fetchManifestations(setLoading);
    }
  }, [fetchManifestations, searchData, page, prevPage, prevSearchData]);

  return (
    <Background>
      <Container>
        <header>
          <h1>Novas manifestações</h1>
          <SearchManifestationsForm
            setSearchData={setSearchData}
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
