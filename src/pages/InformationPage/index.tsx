import React, { useState, useEffect } from "react"
import { toast } from "react-toastify"
import Popup from "reactjs-popup"

import { Background } from "../../styles"
import { GridContainer, CreateNewContainer } from "./styles"
import Api from "../../services/api"
import { useSession } from "../../store/session"
import Ombudsman from "./Ombudsman"
import Prefecture from "./Prefecture"
import CreateOmbudsmanPopup from "./CreateOmbudsmanPopup"
import CreatePrefecturePopup from "./CreatePrefecturePopup"

interface ResponseOmbudsman {
  attendance: string
  created_at: string
  email: string
  id: number
  location: string
  site: string
  telephone: string
  updated_at: string
}

interface ResponsePrefecture {
  attendance: string
  created_at: string
  email: string
  id: number
  location: string
  name: string
  ombudsman: ResponseOmbudsman
  site: string
  telephone: string
  updated_at: string
}

const InformationPage: React.FC = () => {
  const { city, profile } = useSession()
  const [prefecture, setPrefecture] = useState<IPrefecture>()
  const [ombudsman, setOmbudsman] = useState<IOmbudsman>()

  useEffect(() => {
    async function loadData() {
      try {
        const prefectureAndOmbudsmanResponse = await Api.get<
          ResponsePrefecture
        >({
          pathUrl: `/prefecture/${city}`,
          error: false,
        })

        if (!prefectureAndOmbudsmanResponse) {
          throw Error
        }

        setPrefecture(prefectureAndOmbudsmanResponse.data)
        setOmbudsman(prefectureAndOmbudsmanResponse.data.ombudsman)
      } catch (err) {
        toast.error(
          "Não foi possivel obter os dados da Prefeitura e da Ouvidoria"
        )
      }
    }

    loadData()
  }, [city])

  return (
    <Background>
      {profile.role === "master" && (
        <CreateNewContainer>
          <Popup
            trigger={<button>Criar nova ouvidoria</button>}
            position="center center"
            modal
          >
            <CreateOmbudsmanPopup />
          </Popup>
          <Popup
            trigger={<button>Criar nova prefeitura</button>}
            position="center center"
            modal
          >
            <CreatePrefecturePopup />
          </Popup>
        </CreateNewContainer>
      )}
      <GridContainer>
        {ombudsman && prefecture && (
          <>
            <Ombudsman ombudsman={ombudsman} setOmbudsman={setOmbudsman} />
            <Prefecture prefecture={prefecture} setPrefecture={setPrefecture} />
          </>
        )}
      </GridContainer>
    </Background>
  )
}

export default InformationPage
