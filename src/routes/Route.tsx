/**
 * Route.js é um Wrapper para Route (componente do react-router-dom)
 * Contêm tratativas para redirecionar o usuário com base em seu status de login
 * Utiliza também de um componente Wrapper para estilizar todas as rotas privadas
 */
import React, { useContext } from "react"
import { Route, Redirect, RouteProps } from "react-router-dom"
import decodeJWT from "jwt-decode"

import { SessionContext, Provided } from "../store/session"
import DefaultLayout from "../pages/_layouts/DefaultLayout"

type Props = RouteProps & {
  isPrivate?: boolean
  isSuperPrivate?: boolean
  component: any
}

export default function RouteWrapper({
  path,
  exact,
  component: Component,
  isPrivate,
  isSuperPrivate,
  ...rest
}: Props) {
  // se receber isSuperPrivate o isPrivate passa a ser verdadeiro
  if (isSuperPrivate) {
    isPrivate = true
  }

  // ouve o estado de login do admin
  const { session } = useContext<Provided>(SessionContext)
  const { isSigned, token } = session
  const tokenPayload = decodeJWT<IToken>(token)
  const role = tokenPayload?.role[0]

  // caso não esteja logado e acesse uma rota privada redireciona para a página de login
  if (!isSigned && isPrivate) {
    return <Redirect to="/" />
  }

  // caso esteja logado e tente acessar uma rota publica redireciona para a rota privada
  if (isSigned && !isPrivate) {
    // TODO criar rota
    return <Redirect to="/map" />
  }

  // caso a rota seja apenas para master e o admin não for master redireciona para 'map'
  if (isSuperPrivate && role.level !== 1) {
    return <Redirect to="/map" />
  }

  // caso esteja logado renderiza o componente com um Wrapper
  // esse Wrapper criara o menu
  if (isSigned) {
    return (
      <Route
        exact={exact}
        path={path}
        {...rest}
        render={(props) => (
          <DefaultLayout>
            <Component {...props} />
          </DefaultLayout>
        )}
      />
    )
  }

  // caso não esteja logado ele renderiza o componente normalmente
  return <Route {...rest} render={(props) => <Component {...props} />} />
}
