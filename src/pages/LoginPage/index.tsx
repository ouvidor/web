import React from "react"
import { useForm, FormContext } from "react-hook-form"

import Field from "../../components/Form/Field"
import { useSession } from "../../store/session"
import { Wrapper, Container } from "./styles"
import { loginSchema } from "../../validations"

type FormData = {
  email: string
  password: string
}

const LoginPage: React.FC = () => {
  const { signIn } = useSession()

  const form = useForm<FormData>({
    validationSchema: loginSchema,
  })

  async function onLogin({ email, password }: FormData) {
    await signIn({
      email,
      password,
      city: process.env.REACT_APP_CITY,
    })
  }

  return (
    <Wrapper>
      <Container>
        <FormContext {...form}>
          <form onSubmit={form.handleSubmit(onLogin)}>
            <Field
              name="email"
              label="Seu email"
              type="email"
              placeholder="nome@email.com"
            />

            <Field
              label="Sua senha"
              name="password"
              type="password"
              placeholder="Sua senha"
            />

            <button type="submit">Login</button>
          </form>
        </FormContext>
      </Container>
    </Wrapper>
  )
}

export default LoginPage
