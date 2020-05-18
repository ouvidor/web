import React from "react"
import { FormContext, useForm } from "react-hook-form"

import { OmbudsmanContainer, Section } from "./styles"
import Field from "../../components/Form/Field"
import Api from "../../services/api"
import InfoHeader from "./InfoHeader"

type Props = {
  ombudsman: IOmbudsman | undefined
}

interface FormData {
  site: string
  location: string
  email: string
  telephone: string
  attendance: string
}

export default function Omdusman({ ombudsman }: Props) {
  const form = useForm<FormData>()

  async function submitSavedChanges(data: FormData) {
    await Api.put({ pathUrl: `/ombudsman/${ombudsman?.id}`, data })
  }

  return (
    <OmbudsmanContainer>
      <InfoHeader title="Ouvidoria" data={ombudsman} />

      <Section>
        <h1>Edite os dados da Ouvidoria</h1>
        <FormContext {...form}>
          <form onSubmit={form.handleSubmit(submitSavedChanges)}>
            <Field
              name="site"
              label="Site oficial"
              placeholder="www.site.com"
            />
            <Field
              name="location"
              label="Local"
              placeholder="Centro da cidade"
            />
            <Field name="email" label="Email" placeholder="email" />
            <Field
              name="telephone"
              label="Telefone"
              placeholder="(**) ****-****"
            />
            <Field
              name="attendance"
              component="textarea"
              label="Atendimento"
              placeholder="De segunda a sexta: 08:00 até 17:00, Aos sabados e domingos: 12:00 até 16:00"
            />
            <button type="submit">Salvar</button>
          </form>
        </FormContext>
      </Section>
    </OmbudsmanContainer>
  )
}
