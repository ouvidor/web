import React from "react"
import { useForm, FormContext } from "react-hook-form"
import { toast } from "react-toastify"

import { useSession } from "../../store/session"
import Input from "../../components/Form/Field"
import { EditProfileContainer } from "./styles"

type ProfileFormData = {
  first_name?: string
  last_name?: string
  email?: string
  oldPassword?: string
  password?: string
}

type Props = {
  profile: IProfile
}

export default function EditProfile({ profile }: Props) {
  const { updateProfile } = useSession()

  const form = useForm<ProfileFormData>({
    defaultValues: profile,
  })

  async function handleEditProfile(data: ProfileFormData) {
    try {
      await updateProfile({
        id: profile.id,
        email: data.email || undefined,
        first_name: data.first_name || undefined,
        last_name: data.last_name || undefined,
        password: data.password || undefined,
        oldPassword: data.oldPassword || undefined,
      })
      toast.success("O usuário foi editado com sucesso!")
    } catch {
      toast.error("Não foi possível atualizar o perfil.")
    }
  }

  return (
    <EditProfileContainer>
      <FormContext {...form}>
        <h1>Edite seu perfil</h1>
        <form onSubmit={form.handleSubmit(handleEditProfile)}>
          <Input
            name="first_name"
            label="Nome"
            placeholder="Seu primeiro nome"
          />
          <Input
            name="last_name"
            label="Sobrenome"
            placeholder="Seu sobrenome"
          />
          <Input name="email" label="Email" placeholder="seu@email.com" />
          <Input name="oldPassword" label="Senha atual" placeholder="*******" />
          <Input name="password" label="Senha" placeholder="*******" />
          <Input
            name="confirmPassword"
            label="Confirmação de senha"
            placeholder="*******"
          />
          <button type="submit">Salvar</button>
        </form>
      </FormContext>
    </EditProfileContainer>
  )
}
