import React, { useContext } from "react"
import { useForm, FormContext } from "react-hook-form"

import Field from "../../components/Form/Field"
import Api from "../../services/api"
import { SessionContext } from "../../store/session"
import { signIn } from "../../store/session/actions"
import { Wrapper, Container } from "./styles"
import { loginSchema } from "../../validations"

type LoginType = {
  token: string
  user: IProfile
  city: string
}

type FormData = {
  email: string
  password: string
}

export default function Login() {
  const { dispatch } = useContext(SessionContext)

  const form = useForm<FormData>({
    validationSchema: loginSchema,
  })

  async function onLogin({ email, password }: FormData) {
    try {
      const responseBody = await Api.post<LoginType>({
        pathUrl: "auth",
        data: { email, password, city: process.env.REACT_APP_CITY },
      })
      dispatch(
        signIn({
          token: responseBody.token,
          profile: responseBody.user,
          city: responseBody.city,
        })
      )
    } catch (err) {
      console.error(err)
    }
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
