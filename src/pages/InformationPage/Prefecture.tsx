import React from "react"
import { FormContext, useForm } from "react-hook-form"

import { PrefectureContainer, Section } from "./styles"
import Field from "../../components/Form/Field"
import Api from "../../services/api"
import InfoHeader from "./InfoHeader"

type Props = {
  prefecture?: IPrefecture
}

interface FormData {
  site: string
  name: string
  location: string
  email: string
  telephone: string
  attendance: string
}

export default function Prefecture({ prefecture }: Props) {
  const form = useForm<FormData>()

  async function submitSavedChanges(data: FormData) {
    await Api.put({ pathUrl: `/prefecture/${prefecture?.id}`, data })
  }

  return (
    <PrefectureContainer>
      <InfoHeader title="Prefeitura" data={prefecture} />

      <Section>
        <h1>Edite os dados da Prefeitura</h1>
        <FormContext {...form}>
          <form onSubmit={form.handleSubmit(submitSavedChanges)}>
            <Field name="name" label="Nome da cidade" />
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
    </PrefectureContainer>
  )
}
