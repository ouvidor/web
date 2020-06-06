import React, { useState, useEffect, useCallback } from "react"
import { toast } from "react-toastify"
import { MdClear } from "react-icons/md"

import { Background } from "../../styles"
import {
  Container,
  ManifestationList,
  ManifestationContainer,
  NoSelectedContainer,
  Grid,
} from "./styles"
import SearchManifestationsForm from "../../components/SearchManifestationsForm"
import Pagination from "../../components/Pagination"
import ManifestationCard from "../../components/ManifestationCard"
import Manifestation from "../../components/Manifestation"
import Api from "../../services/api"
import { usePrevious } from "../../hooks"

const RecentsPage: React.FC = () => {
  const [page, setPage] = useState(1)
  const [maxPage, setMaxPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [loadingPage, setLoadingPage] = useState(false)
  const [searchData, setSearchData] = useState({})
  const [manifestations, setManifestations] = useState<IManifestation[]>([])
  const [selected, setSelected] = useState<IManifestation>()
  const prevPage = usePrevious(page)
  const prevSearchData = usePrevious(searchData)

  function handleManifestationClick(manifestation: IManifestation) {
    setSelected(manifestation)
  }

  // callback memoizado
  const fetchManifestations = useCallback(
    async (setLoad) => {
      setLoad(true)

      try {
        // passa isRead: 0, para pegar as manifestações que não foram lidas
        const fetchManifestationsResponse = await Api.get<
          IFetchManifestationsResult
        >({
          pathUrl: "manifestation",
          config: { params: { ...searchData, page, isRead: 0 } },
          error: false,
        })

        if (!fetchManifestationsResponse) return

        setManifestations(fetchManifestationsResponse.data.rows)
        setMaxPage(fetchManifestationsResponse.data.last_page)
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
              manifestations.map((m: IManifestation) => (
                <ManifestationCard
                  key={m.id}
                  manifestation={m}
                  handleSelect={() => handleManifestationClick(m)}
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
  )
}

export default RecentsPage
