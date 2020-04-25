import React from "react"
import { useForm, FormContext } from "react-hook-form"
import { toast } from "react-toastify"

import { createUserSchema } from "../../validations"
import Api from "../../services/api"
import Field from "../../components/Form/Field"

type NewUserFormData = {
  first_name?: string
  last_name?: string
  email?: string
  password?: string
  confirmPassword?: string
}

export default function CreateUser() {
  const form = useForm<NewUserFormData>({
    validationSchema: createUserSchema,
  })

  async function handleEditProfile(data: NewUserFormData) {
    console.log(data)
    const user = await Api.post({ pathUrl: "user", data })
    console.log(user)
    if (user) {
      toast.success("Usuário criado com sucesso!")
    }
  }

  return (
    <section>
      <FormContext {...form}>
        <h1>Cadastre um novo usuário</h1>
        <form onSubmit={form.handleSubmit(handleEditProfile)}>
          <Field
            name="first_name"
            label="Nome"
            placeholder="Seu primeiro nome"
          />
          <Field
            name="last_name"
            label="Sobrenome"
            placeholder="Seu sobrenome"
          />
          <Field
            name="email"
            type="email"
            label="Email"
            placeholder="seu@email.com"
          />
          <Field
            name="password"
            type="password"
            label="Senha"
            placeholder="*******"
          />
          <Field
            name="confirmPassword"
            type="password"
            label="Confirmação de senha"
            placeholder="*******"
          />

          <div>
            <input
              type="checkbox"
              name="isAdmin"
              id="isAdmin"
              ref={form.register}
            />
            <label htmlFor="isAdmin">É um administrador?</label>
          </div>

          <button type="submit">Salvar</button>
        </form>
      </FormContext>
    </section>
  )
}
