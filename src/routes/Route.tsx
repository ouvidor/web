/**
 * Route.js é um Wrapper para Route (componente do react-router-dom)
 * Contêm tratativas para redirecionar o usuário com base em seu status de login
 * Utiliza também de um componente Wrapper para estilizar todas as rotas privadas
 */
import React from "react"
import {
  Route,
  Redirect,
  RouteProps,
  RouteComponentProps,
} from "react-router-dom"
import { StaticContext } from "react-router"

import { useSession } from "../store/session"
import DefaultLayout from "../pages/_layouts/DefaultLayout"

interface Props extends RouteProps {
  isPrivate?: boolean
  isSuperPrivate?: boolean
  component: React.FC<RouteComponentProps<any, StaticContext, any>>
}

const RouteWrapper: React.FC<Props> = ({
  path,
  exact,
  component: Component,
  isPrivate,
  isSuperPrivate,
  ...rest
}) => {
  // se receber isSuperPrivate o isPrivate passa a ser verdadeiro
  if (isSuperPrivate) {
    isPrivate = true
  }

  // ouve o estado de login do admin
  const { profile } = useSession()
  const notAuthenticatedAndRouteIsPrivate = !profile && isPrivate
  const authenticatedAndRouteIsNotPrivate = profile && !isPrivate
  const masterAndRouteIsMasterOnly = isSuperPrivate && profile.role !== "master"

  // caso não esteja logado e acesse uma rota privada redireciona para a página de login
  if (notAuthenticatedAndRouteIsPrivate) {
    console.log("Deveria redirecionar para /")
    return <Redirect to="/" />
  }

  // caso esteja logado e tente acessar uma rota publica redireciona para a rota privada
  if (authenticatedAndRouteIsNotPrivate) {
    return <Redirect to="/map" />
  }

  // caso a rota seja apenas para master e o admin não for master redireciona para 'map'
  if (masterAndRouteIsMasterOnly) {
    return <Redirect to="/map" />
  }

  // caso esteja logado renderiza o componente com um Wrapper
  // esse Wrapper criara o menu
  if (profile) {
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

export default RouteWrapper
