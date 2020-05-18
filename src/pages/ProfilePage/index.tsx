import React from "react"
import { Switch, Route, Link, useRouteMatch } from "react-router-dom"
import { toast } from "react-toastify"

import { useSession } from "../../store/session"
import { Background } from "../../styles"
import { NavBar } from "./styles"
import ProfileSection from "./Profile"
import EditProfileSection from "./EditProfile"
import VisualizeAdminsSection from "./VisualizeAdmins"
import CreateUserSection from "./CreateUser"

const ProfilePage: React.FC = () => {
  const { path, url } = useRouteMatch()

  /**
   * Pega o token e o perfil e checa se o usuário é um admin master
   */
  const { profile, signOut } = useSession()

  if (!profile) {
    signOut()
    toast.error("Ocorreu um erro de seção, por favor faça login novamente")
    return <>Redirecionando...</>
  }

  return (
    <Background>
      <NavBar>
        <Link to={url}>Meu perfil</Link>
        <Link to={`${url}/edit`}>Editar meu perfil</Link>
        <Link to={`${url}/admins`}>Visualizar administradores</Link>
        {profile.role === "master" && (
          <Link to={`${url}/new`}>Novo usuário</Link>
        )}
      </NavBar>

      <Switch>
        <Route exact path={path}>
          <ProfileSection profile={profile} />
        </Route>
        <Route path={`${path}/edit`}>
          <EditProfileSection profile={profile} />
        </Route>
        <Route path={`${path}/admins`}>
          <VisualizeAdminsSection />
        </Route>
        <Route path={`${path}/new`}>
          <CreateUserSection />
        </Route>
      </Switch>
    </Background>
  )
}

export default ProfilePage
