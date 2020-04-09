import React from "react"
import { useForm, FormContext } from "react-hook-form"

import { Section } from "./styles"
import Field from "../../components/Form/Field"

type Props = {
  title: string
  submit(data: FormData): void
}

type FormData = IPrefecture | IOmbudsman

export default function InfoForm({ submit, title }: Props) {
  const form = useForm<FormData>()

  function handleClickSubmit(data: IOmbudsman | IPrefecture) {
    submit(data)
  }

  return (
    <Section>
      <h1>Edite os dados da {title}</h1>
      <FormContext {...form}>
        <form onSubmit={form.handleSubmit(handleClickSubmit)}>
          <Field name="site" label="Site oficial" placeholder="www.site.com" />
          <Field name="location" label="Local" placeholder="Centro da cidade" />
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
  )
}
