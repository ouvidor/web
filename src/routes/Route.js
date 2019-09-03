/**
 * Route.js é um Wrapper para Route (componente do react-router-dom)
 * Contêm tratativas para redirecionar o usuário com base em seu status de login
 * Utiliza também de um componente Wrapper para estilizar todas as rotas privadas
 */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import DefaultLayout from '../pages/_layouts/DefaultLayout';

export default function RouteWrapper({
  component: Component,
  isPrivate,
  ...rest
}) {
  // flag de autenticação
  // TODO utilizar redux para pegar o dado
  const logged = true;

  // caso não esteja logado e acesse uma rota privada redireciona para a página de login
  if (!logged && isPrivate) {
    return <Redirect to="/" />;
  }

  // caso esteja logado e tente acessar uma rota publica redireciona para a rota privada
  if (logged && !isPrivate) {
    // TODO criar rota
    return <Redirect to="/dashboard" />;
  }

  // caso esteja logado renderiza o componente com um Wrapper
  // esse Wrapper criara o menu
  if (logged) {
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
};

// caso não receba a prop, esse valor será aplicado
RouteWrapper.defaultProps = {
  isPrivate: false,
};
