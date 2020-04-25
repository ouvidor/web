import React, { useContext } from "react"
import { useForm, FormContext } from "react-hook-form"
import { toast } from "react-toastify"

import Api from "../../services/api"
import { SessionContext } from "../../store/session"
import { updateProfile } from "../../store/session/actions"
import Input from "../../components/Form/Field"

type ProfileFormData = {
  first_name?: string
  last_name?: string
  email?: string
  password?: string
  confirmPassword?: string
}

type Props = {
  profile: IProfile
}

export default function EditProfile({ profile }: Props) {
  const { dispatch } = useContext(SessionContext)

  const form = useForm<ProfileFormData>({
    defaultValues: profile,
  })

  function handleUpdateProfile(user: IProfile) {
    dispatch(updateProfile({ profile: user }))
  }

  async function handleEditProfile(data: ProfileFormData) {
    const formattedData = {
      ...data,
      password: data.password || undefined,
      confirmPassword: data.confirmPassword || undefined,
    }

    const updateUser = await Api.put<IProfile>({
      pathUrl: `user/${profile.id}`,
      data: formattedData,
    })

    if (updateUser) {
      toast.success("O usuário foi editado com sucesso!")
      handleUpdateProfile(updateUser)
    }
  }

  return (
    <section>
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
          <Input name="password" label="Senha" placeholder="*******" />
          <Input
            name="confirmPassword"
            label="Confirmação de senha"
            placeholder="*******"
          />
          <button type="submit">Salvar</button>
        </form>
      </FormContext>
    </section>
  )
}
