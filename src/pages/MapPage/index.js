import React, { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';

import {
  Container,
  BodyWrapper,
  Body,
  List,
  Scroll,
  MapWrapper,
  DragContainer,
} from './styles';
import SearchManifestationsForm from '../../components/SearchManifestationsForm';
import Pagination from '../../components/Pagination';
import MapView from '../../components/MapView';
import ManifestationCard from '../../components/ManifestationCard';
import Manifestation from '../../components/Manifestation';
import Api from '../../services/api';
import { usePrevious } from '../../hooks';

export default function MapPage() {
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  const [manifestations, setManifestations] = useState([]);
  const [selecteds, setSelecteds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingPage, setLoadingPage] = useState(false);
  const [searchData, setSearchData] = useState({});
  const prevPage = usePrevious(page);
  const prevSearchData = usePrevious(searchData);

  // callback memoizado
  const fetchManifestations = useCallback(
    async setLoad => {
      setLoad(true);
      // pegando apenas o titulo das opções
      let formattedSearchData;
      if (searchData.options) {
        formattedSearchData = {
          text: searchData.text,
          options: searchData.options.map(option => option.title),
        };
      }

      try {
        // fetch manifestations
        const data = await Api.get({
          pathUrl: 'manifestation',
          params: { ...formattedSearchData, page },
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
    console.log('searchData, page, prevPage, prevSearchData');
    console.log(searchData, page, prevPage, prevSearchData);
    console.log('==========================================');
    if (prevPage !== page) {
      fetchManifestations(setLoadingPage);
      console.log('PESQUISA EXECUTADA POR MUDANÇA DE PÁGINA');
      return;
    }
    if (prevSearchData !== searchData) {
      setPage(1);
      fetchManifestations(setLoading);
      console.log('PESQUISA EXECUTADA POR FILTRO');
    }
  }, [fetchManifestations, searchData, page, prevPage, prevSearchData]);

  return (
    <Container>
      <BodyWrapper>
        <Body>
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

          <Scroll>
            <List>
              {manifestations &&
                manifestations.map(m => (
                  <ManifestationCard
                    key={m.id}
                    manifestation={m}
                    handleClick={() => setSelecteds([...selecteds, m])}
                  />
                ))}
            </List>
          </Scroll>
        </Body>

        {process.env.REACT_APP_GOOGLE_MAPS_KEY ? (
          <MapWrapper>
            <DragContainer>
              <div>
                {selecteds &&
                  selecteds.map(m => (
                    <Manifestation
                      draggable
                      pos={selecteds.length}
                      manifestation={m}
                      key={m.id}
                    />
                  ))}
              </div>
            </DragContainer>
            <MapView
              items={manifestations}
              selectItem={item => {
                setSelecteds([...selecteds, item]);
              }}
            />
          </MapWrapper>
        ) : (
          <section>Sem a chave de acesso ao mapa</section>
        )}
      </BodyWrapper>
    </Container>
  );
}
