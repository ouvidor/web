/**
 * Route.js é um Wrapper para Route (componente do react-router-dom)
 * Contêm tratativas para redirecionar o usuário com base em seu status de login
 * Utiliza também de um componente Wrapper para estilizar todas as rotas privadas
 */
import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import decodeJWT from 'jwt-decode';

import { SessionContext } from '../store/session';
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
  const { session } = useContext(SessionContext);
  const { isSigned, token } = session;
  const tokenPayload = token && decodeJWT(token);
  const role = tokenPayload && tokenPayload.role && tokenPayload.role[0];

  // caso não esteja logado e acesse uma rota privada redireciona para a página de login
  if (!isSigned && isPrivate) {
    return <Redirect to="/" />;
  }

  // caso esteja logado e tente acessar uma rota publica redireciona para a rota privada
  if (isSigned && !isPrivate) {
    // TODO criar rota
    return <Redirect to="/map" />;
  }

  // caso a rota seja apenas para master e o admin não for master redireciona para 'map'
  if (isSuperPrivate && role.level !== 1) {
    return <Redirect to="/map" />;
  }

  // caso esteja logado renderiza o componente com um Wrapper
  // esse Wrapper criara o menu
  if (isSigned) {
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
