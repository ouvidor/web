import React, { useState } from "react"
import { useForm, FormContext } from "react-hook-form"

import Field from "../../../../components/Form/Field"
import { Container, StyledMdCheck, StyledMdClear } from "./styles"
import { settingsSchema } from "../../../../validations"

export type SubmittedData = SettingFormData & {
  id?: number
}

export type SettingFormData = {
  title: string
  email?: string
}

type Props = {
  email?: boolean
  item?: IGenericItem
  placeholder?: string
  submitChange(data: SubmittedData, isSaving: boolean): void
}

export default function SettingsItem({
  email = undefined,
  item = undefined,
  placeholder = undefined,
  submitChange,
}: Props) {
  // quando for 'false' é para excluir, quando for 'true' é pra salvar
  const [isSaving, setIsSaving] = useState(false)

  const form = useForm<SettingFormData>({
    validationSchema: settingsSchema,
    defaultValues: item || undefined,
  })

  function onClickSubmit(data: SettingFormData) {
    // botao de limpar
    if (!item && !isSaving) {
      form.reset()
    } else {
      submitChange({ ...data, id: item?.id }, isSaving)
      if (!item) {
        form.reset()
      }
    }
  }

  return (
    <Container key={item && item.id}>
      <FormContext {...form}>
        <form onSubmit={form.handleSubmit(onClickSubmit)}>
          <Field name="title" placeholder={placeholder} />
          {email && <Field name="email" placeholder="um@email.com" />}

          <aside>
            <button type="submit" onClick={() => setIsSaving(true)}>
              <StyledMdCheck />
            </button>
            <button type="submit" onClick={() => setIsSaving(false)}>
              <StyledMdClear />
            </button>
          </aside>
        </form>
      </FormContext>
    </Container>
  )
}
