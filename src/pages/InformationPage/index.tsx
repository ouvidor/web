import React, { useState, useEffect } from "react"
import { toast } from "react-toastify"

import { Background } from "../../styles"
import { GridContainer } from "./styles"
import Api from "../../services/api"
import Ombudsman from "./Ombudsman"
import Prefecture from "./Prefecture"

export default function InformationPage() {
  const [prefecture, setPrefecture] = useState<IPrefecture>()
  const [ombudsman, setOmbudsman] = useState<IOmbudsman>()

  useEffect(() => {
    async function loadData() {
      try {
        const prefectureData = await Api.get<IPrefecture>({
          pathUrl: "/prefecture",
          error: false,
        })

        const ombudsmanData = await Api.get<IOmbudsman>({
          pathUrl: "/ombudsman",
          error: false,
        })

        if (!prefectureData || !ombudsmanData) {
          throw Error
        }

        setPrefecture(prefectureData)
        setOmbudsman(ombudsmanData)
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
