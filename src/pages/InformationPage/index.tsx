import React, { useState, useEffect, useContext } from "react"
import { toast } from "react-toastify"

import { Background } from "../../styles"
import { GridContainer } from "./styles"
import Api from "../../services/api"
import { SessionContext } from "../../store/session/index"
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

export default function InformationPage() {
  const { session } = useContext(SessionContext)
  const [prefecture, setPrefecture] = useState<IPrefecture>()
  const [ombudsman, setOmbudsman] = useState<IOmbudsman>()

  useEffect(() => {
    async function loadData() {
      try {
        const prefectureAndOmbudsman = await Api.get<ResponsePrefecture>({
          pathUrl: `/prefecture/${session.city}`,
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
  }, [])

  return (
    <Background>
      <GridContainer>
        <Ombudsman ombudsman={ombudsman} />
        <Prefecture prefecture={prefecture} />
      </GridContainer>
    </Background>
  )
}
