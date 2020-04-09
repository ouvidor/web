import React from "react"

import { OmbudsmanContainer } from "./styles"
import Api from "../../services/api"
import InfoForm from "./InfoForm"
import InfoHeader from "./InfoHeader"

type Props = {
  ombudsman: IOmbudsman | undefined
}

export default function Omdusman({ ombudsman }: Props) {
  async function submitSavedChanges(data: IOmbudsman) {
    await Api.post({ pathUrl: "/ombudsman", data })
  }

  return (
    <OmbudsmanContainer>
      <InfoHeader title="Ouvidoria" data={ombudsman} />

      <InfoForm title="ouvidoria" submit={submitSavedChanges} />
    </OmbudsmanContainer>
  )
}
