/**
 * Componente responsável por agregar todas as rotas da aplicação
 *
 * Switch: permite apenas que uma rota seja acessada
 */

import React from 'react';
import { Switch } from 'react-router-dom';

// rota customizada para controle de rotas privadas
import Route from './Route';

// páginas
import Login from '../pages/Login';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Login} />
    </Switch>
  );
}
