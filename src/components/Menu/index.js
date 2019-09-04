/**
 * Componente Menu
 * Usado para navegação, fica fixo no canto esquerdo da tela
 * Recebe o tipo do usuário e renderiza apenas as opções disponíveis a ele
 */
import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { MdMap } from 'react-icons/md';

import { Background, ButtonsList } from './styles';

export default function Menu({ adminMasterStatus }) {
  // TODO pegar do redux, mas pra facilitar nos testes pode receber também
  const isAdminMaster = false || adminMasterStatus;

  return (
    <Background>
      <nav>
        <ButtonsList>
          <li>
            <NavLink to="/map" activeClassName="active-menu-btn">
              <MdMap />
            </NavLink>
          </li>
          <li>
            <NavLink to="/statistics" activeClassName="active-menu-btn">
              <MdMap />
            </NavLink>
          </li>
          {isAdminMaster && (
            <li>
              <NavLink to="/recent" activeClassName="active-menu-btn">
                <MdMap />
              </NavLink>
            </li>
          )}
        </ButtonsList>
      </nav>
    </Background>
  );
}

Menu.propTypes = { adminMasterStatus: PropTypes.bool };
Menu.defaultProps = { adminMasterStatus: false };
