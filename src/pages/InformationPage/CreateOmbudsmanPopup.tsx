import React from "react"
import { FormContext, useForm } from "react-hook-form"
import { toast } from "react-toastify"

import Api from "../../services/api"
import { createOmbudsmanSchema } from "../../validations"
import Field from "../../components/Form/Field"
import { PopupContainer } from "./styles"

interface OmbudsmanFormData {
  site: string
  location: string
  email: string
  telephone: string
  attendance: string
}

const CreateOmbudsmanPopup: React.FC = () => {
  const form = useForm<OmbudsmanFormData>({
    validationSchema: createOmbudsmanSchema,
  })

  async function submitNewOmbudsman(data: OmbudsmanFormData) {
    const result = await Api.post<IOmbudsman>({ pathUrl: "/ombudsman", data })

    if (result && result.data) {
      toast.success("Ouvidoria criada com sucesso")
    }
  }

  return (
    <PopupContainer>
      <FormContext {...form}>
        <form onSubmit={form.handleSubmit(submitNewOmbudsman)}>
          <Field name="site" label="Site oficial" />
          <Field name="location" label="Local" />
          <Field name="email" label="Email" />
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
          <button type="submit">Criar</button>
        </form>
      </FormContext>
    </PopupContainer>
  )
}

export default CreateOmbudsmanPopup
