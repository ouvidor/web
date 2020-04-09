import React from "react"

import { PrefectureContainer } from "./styles"
import Api from "../../services/api"
import InfoHeader from "./InfoHeader"
import InfoForm from "./InfoForm"

type Props = {
  prefecture?: IPrefecture
}

export default function Prefecture({ prefecture }: Props) {
  async function submitSavedChanges(data: IPrefecture) {
    await Api.post({ pathUrl: "/prefecture", data })
  }

  return (
    <PrefectureContainer>
      <InfoHeader title="Prefeitura" data={prefecture} />

      <InfoForm title="prefeitura" submit={submitSavedChanges} />
    </PrefectureContainer>
  )
}
