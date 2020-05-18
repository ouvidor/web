import React, { useState, useEffect } from "react"
import { toast } from "react-toastify"

import { Background } from "../../styles"
import { GridContainer } from "./styles"
import Api from "../../services/api"
import { useSession } from "../../store/session"
import Ombudsman from "./Ombudsman"
import Prefecture from "./Prefecture"

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
  const { city } = useSession()
  const [prefecture, setPrefecture] = useState<IPrefecture>()
  const [ombudsman, setOmbudsman] = useState<IOmbudsman>()

  useEffect(() => {
    async function loadData() {
      try {
        const prefectureAndOmbudsman = await Api.get<ResponsePrefecture>({
          pathUrl: `/prefecture/${city}`,
          error: false,
        })

        if (!prefectureAndOmbudsman) {
          throw Error
        }

        setPrefecture(prefectureAndOmbudsman)
        setOmbudsman(prefectureAndOmbudsman.ombudsman)
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
      <GridContainer>
        <Ombudsman ombudsman={ombudsman} />
        <Prefecture prefecture={prefecture} />
      </GridContainer>
    </Background>
  )
}

export default InformationPage
