import React, { useState } from "react"
import { FormContext, useForm } from "react-hook-form"
import { toast } from "react-toastify"

import { editPrefectureSchema } from "../../validations"
import Field from "../../components/Form/Field"
import Api from "../../services/api"
import { PrefectureContainer, Section, Header } from "./styles"

type Props = {
  prefecture: IPrefecture
  setPrefecture(prefecture: IPrefecture): void
}

interface FormData {
  site: string
  name: string
  location: string
  email: string
  telephone: string
  attendance: string
}

export default function Prefecture({ prefecture, setPrefecture }: Props) {
  const [isEditing, setIsEditing] = useState(false)

  const form = useForm<FormData>({
    defaultValues: prefecture,
    validationSchema: editPrefectureSchema,
  })

  async function submitSavedChanges(data: FormData) {
    const updatedPrefectureResponse = await Api.put<IPrefecture>({
      pathUrl: `/prefecture/${prefecture.id}`,
      data,
    })

    if (!updatedPrefectureResponse) {
      return
    }

    setPrefecture(updatedPrefectureResponse.data)
    toast.success("Prefeitura atualizada com sucesso")
  }

  return (
    <PrefectureContainer>
      <Header>
        <h1>Prefeitura</h1>
        <h2>{prefecture.name}</h2>
        <section>
          <h2>Dados</h2>
          <p>Local da prefeitura:</p> <span>{prefecture.location}</span>
          <div>
            <h3>Contato</h3>
            <p>Telefone:</p> <span>{prefecture.telephone}</span>
            <br />
            <p>Email:</p> <span>{prefecture.email}</span>
            <br />
            <p>Site:</p> <span>{prefecture.site}</span>
            <br />
            <p>Horario de atendimento:</p> <span>{prefecture.attendance}</span>
          </div>
        </section>
        <button onClick={() => setIsEditing(!isEditing)}>
          Edite dados da prefeitura
        </button>
      </Header>

      {isEditing && (
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
              <Field
                label="Email da ouvidoria"
                name="ombudsmanEmail"
                placeholder="email@email.br"
              />
              <button type="submit">Editar</button>
            </form>
          </FormContext>
        </Section>
      )}
    </PrefectureContainer>
  )
}
