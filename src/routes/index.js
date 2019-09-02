/**
 * Componente responsável por agregar todas as rotas da aplicação
 *
 * Switch: permite apenas que uma rota seja acessada
 * AuthRoute: rota que precisa de autenticação
 * Route: rota normal, permite a prop render
 */

import React from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';

// rota customizada para controle de rotas privadas
import AuthRoute from './Route';

// páginas
import Login from '../pages/Login';

export default function Routes() {
  return (
    <Switch>
      <AuthRoute path="/" exact component={Login} />

      <Route render={() => <Redirect pathname="/" />} />
    </Switch>
  );
}
