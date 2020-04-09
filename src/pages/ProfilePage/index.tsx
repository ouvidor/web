import React, { useContext } from "react"
import decodeJWT from "jwt-decode"
import { Switch, Route, Link, useRouteMatch } from "react-router-dom"

import { SessionContext } from "../../store/session"
import { signOut } from "../../store/session/actions"
import { Background } from "../../styles"
import { NavBar } from "./styles"
import ProfileSection from "./Profile"
import { toast } from "react-toastify"

export default function ProfilePage() {
  const { path, url } = useRouteMatch()

  /**
   * Pega o token e o perfil e checa se o usuário é um admin master
   */
  const { session, dispatch } = useContext(SessionContext)
  const { token, profile } = session
  const tokenPayload = token && decodeJWT<IToken>(token)
  const role = tokenPayload && tokenPayload.role[0]
  const isAdminMaster = role && role.title === "master"

  if (!profile) {
    dispatch(signOut())
    toast.error("Ocorreu um erro de seção, por favor faça login novamente")
    return <>Redirecionando...</>
  }

  return (
    <Background>
      <NavBar>
        <Link to={url}>Meu perfil</Link>
        <Link to={`${url}/edit`}>Editar meu perfil</Link>
        <Link to={`${url}/admins`}>Visualizar administradores</Link>
        {isAdminMaster && (
          <Link to={`${url}/new_admin`}>Novo adminstrador</Link>
        )}
      </NavBar>

      <Switch>
        <Route exact path={path}>
          <ProfileSection profile={profile} />
        </Route>
        <Route path={`${path}/edit`}>
          <div>Editar perfil</div>
        </Route>
        <Route path={`${path}/admins`}>
          <div>Visualizando admins cadastrados</div>
        </Route>
        <Route path={`${path}/new_admin`}>
          <div>Chame uma nova pessoa para fazer parte do time de admins</div>
        </Route>
      </Switch>
    </Background>
  )
}
