import React, { useState, useEffect, useCallback } from "react"
import { toast } from "react-toastify"

import {
  Container,
  BodyWrapper,
  Body,
  List,
  Scroll,
  MapWrapper,
  DragContainer,
} from "./styles"
import SearchManifestationsForm, {
  SearchData,
} from "../../components/SearchManifestationsForm"
import Pagination from "../../components/Pagination"
import MapView from "../../components/MapView"
import ManifestationCard from "../../components/ManifestationCard"
import Manifestation from "../../components/Manifestation"
import Api from "../../services/api"
import { usePrevious } from "../../hooks"

const MapPage: React.FC = () => {
  const [page, setPage] = useState(1)
  const [maxPage, setMaxPage] = useState(1)
  const [manifestations, setManifestations] = useState<IManifestation[]>([])
  const [selecteds, setSelecteds] = useState<IManifestation[]>([])
  const [loading, setLoading] = useState(false)
  const [loadingPage, setLoadingPage] = useState(false)
  const [searchData, setSearchData] = useState<SearchData>()
  const prevPage = usePrevious(page)
  const prevSearchData = usePrevious(searchData)

  // callback memoizado
  const fetchManifestations = useCallback(
    async (setLoad) => {
      setLoad(true)

      try {
        // fetch manifestations
        const fetchManifestationsResult = await Api.get<
          IFetchManifestationsResult
        >({
          pathUrl: "manifestation",
          params: { ...searchData, page },
          error: false,
        })

        setManifestations(fetchManifestationsResult.rows)
        setMaxPage(fetchManifestationsResult.last_page)
      } catch (error) {
        toast.error("Não foi possivel buscar por manifestações")
      }
      setLoad(false)
    },
    [page, searchData]
  )

  useEffect(() => {
    if (prevPage !== page) {
      fetchManifestations(setLoadingPage)
      return
    }
    if (prevSearchData !== searchData) {
      setPage(1)
      fetchManifestations(setLoading)
    }
  }, [fetchManifestations, searchData, page, prevPage, prevSearchData])

  function handleSelectManifestation(selectedManifestation: IManifestation) {
    setSelecteds([...selecteds, selectedManifestation])
  }

  function handleSelectItemOnMap(item: IManifestation) {
    setSelecteds([...selecteds, item])
  }

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
                manifestations.map((m) => (
                  <ManifestationCard
                    key={m.id}
                    manifestation={m}
                    handleSelect={handleSelectManifestation}
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
                  selecteds.map((m) => (
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
              selectItem={handleSelectItemOnMap}
            />
          </MapWrapper>
        ) : (
          <section>Sem a chave de acesso ao mapa</section>
        )}
      </BodyWrapper>
    </Container>
  )
}

export default MapPage
