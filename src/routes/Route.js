/**
 * Route.js é um Wrapper para Route (componente do react-router-dom)
 * Contêm tratativas para redirecionar o usuário com base em seu status de login
 * Utiliza também de um componente Wrapper para estilizar todas as rotas privadas
 */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import decodeJWT from 'jwt-decode';

import DefaultLayout from '../pages/_layouts/DefaultLayout';

export default function RouteWrapper({
  component: Component,
  isPrivate,
  isSuperPrivate,
  ...rest
}) {
  // se receber isSuperPrivate o isPrivate passa a ser verdadeiro
  if (isSuperPrivate) {
    isPrivate = true;
  }

  // ouve o estado de login do admin
  const { signed, token } = useSelector(state => state.auth);
  const tokenPayload = token && decodeJWT(token);
  const role = tokenPayload.role && tokenPayload.role[0];

  // caso não esteja logado e acesse uma rota privada redireciona para a página de login
  if (!signed && isPrivate) {
    return <Redirect to="/" />;
  }

  // caso esteja logado e tente acessar uma rota publica redireciona para a rota privada
  if (signed && !isPrivate) {
    // TODO criar rota
    return <Redirect to="/map" />;
  }

  // caso a rota seja apenas para master e o admin não for master redireciona para 'map'
  if (isSuperPrivate && role.title !== 'master') {
    return <Redirect to="/map" />;
  }

  // caso esteja logado renderiza o componente com um Wrapper
  // esse Wrapper criara o menu
  if (signed) {
    return (
      <Route
        {...rest}
        render={props => (
          <DefaultLayout>
            <Component {...props} />
          </DefaultLayout>
        )}
      />
    );
  }

  // caso não esteja logado ele renderiza o componente normalmente
  return <Route {...rest} render={props => <Component {...props} />} />;
}

// define o tipo de props que devem ser recebidas
RouteWrapper.propTypes = {
  component: PropTypes.oneOfType([PropTypes.func, PropTypes.element])
    .isRequired,
  isPrivate: PropTypes.bool,
  isSuperPrivate: PropTypes.bool,
};

// caso não receba a prop, esse valor será aplicado
RouteWrapper.defaultProps = {
  isPrivate: null,
  isSuperPrivate: null,
};
