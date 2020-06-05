import React from "react"
import { useForm, FormContext } from "react-hook-form"
import { toast } from "react-toastify"

import { createUserSchema } from "../../validations"
import Api from "../../services/api"
import Field from "../../components/Form/Field"

type NewUserFormData = {
  first_name: string
  last_name: string
  email: string
  password: string
  confirmPassword: string
  isAdmin?: boolean
  role?: "admin" | "citizen"
}

export default function CreateUser() {
  const form = useForm<NewUserFormData>({
    validationSchema: createUserSchema,
  })

  async function handleCreateUser(data: NewUserFormData) {
    const formattedData = data
    formattedData.role = data.isAdmin ? "admin" : "citizen"
    delete formattedData.isAdmin

    const user = await Api.post<IProfile>({
      pathUrl: "user",
      data: formattedData,
    })

    if (user) {
      toast.success(`Usuário: ${user.first_name} criado com sucesso!`)
      form.reset()
    }
  }

  return (
    <section>
      <FormContext {...form}>
        <h1>Cadastre um novo usuário</h1>
        <form onSubmit={form.handleSubmit(handleCreateUser)}>
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
