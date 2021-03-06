/**
 * Componente responsável por agregar todas as rotas da aplicação
 *
 * Switch: permite apenas que uma rota seja acessada
 * AuthRoute: rota que precisa de autenticação
 * Route: rota normal, permite a prop render
 */

import React from "react"
import { Switch, Redirect, Route } from "react-router-dom"

// rota customizada para controle de rotas privadas
import AuthRoute from "./Route"

// páginas
import LoginPage from "../pages/LoginPage"
import MapPage from "../pages/MapPage"
import RecentsPage from "../pages/RecentsPage"
import CreatePage from "../pages/CreatePage"
import StatisticsPage from "../pages/StatisticsPage"
import SendPage from "../pages/SendPage"
import StatusPage from "../pages/StatusPage"
import SettingsPage from "../pages/SettingsPage"
import ProfilePage from "../pages/ProfilePage"
import InformationPage from "../pages/InformationPage"

export default function Routes() {
  return (
    <Switch>
      <AuthRoute path="/" exact component={LoginPage} />
      <AuthRoute path="/map" isPrivate component={MapPage} />
      <AuthRoute path="/recent" isPrivate component={RecentsPage} />
      <AuthRoute path="/create" isPrivate component={CreatePage} />
      <AuthRoute path="/statistics" isPrivate component={StatisticsPage} />
      <AuthRoute path="/send/:id?" isPrivate component={SendPage} />
      <AuthRoute path="/status/:id?" isPrivate component={StatusPage} />
      <AuthRoute path="/settings" isSuperPrivate component={SettingsPage} />
      <AuthRoute path="/public-info" isPrivate component={InformationPage} />
      <AuthRoute path="/profile" isPrivate component={ProfilePage} />

      <Route render={() => <Redirect to="/" />} />
    </Switch>
  )
}
