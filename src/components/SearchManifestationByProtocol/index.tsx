import React from "react"
import { useForm, FormContext } from "react-hook-form"

import Field from "../Form/Field"
import { StyledForm } from "./styles"
import { searchByProtocolSchema } from "../../validations"

export type SearchManifestationProps = {
  protocol: string
}

type Props = {
  handleFetch(data: SearchManifestationProps): Promise<void>
  label: string
}

const SearchManifestationByProtocol = ({ handleFetch, label }: Props) => {
  const form = useForm<SearchManifestationProps>({
    validationSchema: searchByProtocolSchema,
  })

  function handleClickSubmit(data: SearchManifestationProps) {
    handleFetch(data)
  }

  return (
    <FormContext {...form}>
      <h1>{label}</h1>
      <StyledForm onSubmit={form.handleSubmit(handleClickSubmit)}>
        <Field
          placeholder="Exemplo: k6f7ju38"
          name="protocol"
          label="Protocolo"
        />
        <button type="submit">Buscar</button>
      </StyledForm>
    </FormContext>
  )
}

export default SearchManifestationByProtocol
