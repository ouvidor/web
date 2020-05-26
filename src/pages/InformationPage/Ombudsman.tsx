import React, { useState } from "react"
import { FormContext, useForm } from "react-hook-form"

import { OmbudsmanContainer, Section, Header } from "./styles"
import Field from "../../components/Form/Field"
import Api from "../../services/api"

type Props = {
  ombudsman: IOmbudsman
  setOmbudsman(ombudsman: IOmbudsman): void
}

interface FormData {
  site: string
  location: string
  email: string
  telephone: string
  attendance: string
}

export default function Omdusman({ ombudsman, setOmbudsman }: Props) {
  const [isEditing, setIsEditing] = useState(false)

  const form = useForm<FormData>({
    defaultValues: ombudsman,
  })

  async function submitSavedChanges(data: FormData) {
    const updatedOmbudsman = await Api.put<IOmbudsman>({
      pathUrl: `/ombudsman/${ombudsman.id}`,
      data,
    })

    setOmbudsman(updatedOmbudsman)
  }

  return (
    <OmbudsmanContainer>
      <Header>
        <h1>Ouvidoria</h1>
        <section>
          <h2>Dados</h2>
          <p>Local da ouvidoria:</p> <span>{ombudsman.location}</span>
          <div>
            <h3>Contato</h3>
            <p>Telefone:</p> <span>{ombudsman.telephone}</span>
            <br />
            <p>Email:</p> <span>{ombudsman.email}</span>
            <br />
            <p>Site:</p> <span>{ombudsman.site}</span>
            <br />
            <p>Horario de atendimento:</p> <span>{ombudsman.attendance}</span>
          </div>
        </section>
        <button onClick={() => setIsEditing(!isEditing)}>
          Editar dados da ouvidoria
        </button>
      </Header>

      {isEditing && (
        <Section>
          <h2>Editando os dados da Ouvidoria</h2>
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
      )}
    </OmbudsmanContainer>
  )
}
