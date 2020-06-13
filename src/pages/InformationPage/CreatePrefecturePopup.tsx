import React from "react"
import { FormContext, useForm } from "react-hook-form"
import { toast } from "react-toastify"

import Api from "../../services/api"
import { createPrefectureSchema } from "../../validations"
import Field from "../../components/Form/Field"
import { PopupContainer } from "./styles"

interface PrefectureFormData {
  name: string
  site: string
  location: string
  email: string
  telephone: string
  attendance: string
}

const CreatePrefecturePopup: React.FC = () => {
  const form = useForm<PrefectureFormData>({
    validationSchema: createPrefectureSchema,
  })

  async function submitNewOmbudsman(data: PrefectureFormData) {
    const result = await Api.post<IPrefecture>({ pathUrl: "/prefecture", data })

    if (result && result.data) {
      toast.success("Ouvidoria criada com sucesso")
    }
  }

  return (
    <PopupContainer>
      <FormContext {...form}>
        <form onSubmit={form.handleSubmit(submitNewOmbudsman)}>
          <Field name="name" label="Nome da cidade" />
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
          <Field
            label="Email da ouvidoria"
            name="ombudsmanEmail"
            placeholder="email@email.br"
          />
          <button type="submit">Criar</button>
        </form>
      </FormContext>
    </PopupContainer>
  )
}

export default CreatePrefecturePopup
