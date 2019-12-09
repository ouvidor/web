/**
 * Componente Menu
 * Usado para navegação, fica fixo no canto esquerdo da tela
 * Recebe o tipo do usuário e renderiza apenas as opções disponíveis a ele
 */
import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import {
  MdMap,
  MdVisibility,
  MdCreate,
  MdEqualizer,
  MdSend,
  MdEmail,
  MdSettings,
  MdFace,
} from 'react-icons/md';
import decodeJWT from 'jwt-decode';

import { Container, Item, ActiveIndicator } from './styles';

function CustomLink({ to, Icon }) {
  const { pathname } = useLocation();
  return (
    <Item>
      <Link to={to}>
        <Icon />
      </Link>
      {to === pathname && <ActiveIndicator />}
    </Item>
  );
}

export default function Menu({ isAdminMasterState }) {
  // pega o token e checa a Role
  const token = useSelector(state => state.auth.token);
  const tokenPayload = token && decodeJWT(token);
  const role = tokenPayload && tokenPayload.role[0];
  const isAdminMaster = (role && role.title === 'master') || isAdminMasterState;

  return (
    <Container>
      <ul>
        <CustomLink to="/map" Icon={MdMap} />
        <CustomLink to="/recent" Icon={MdVisibility} />
        <CustomLink to="/create" Icon={MdCreate} />
        <CustomLink to="/statistics" Icon={MdEqualizer} />
        <CustomLink to="/send" Icon={MdSend} />
        <CustomLink to="/status" Icon={MdSend} />
        <CustomLink to="/email" Icon={MdEmail} />
        {isAdminMaster && <CustomLink to="/settings" Icon={MdSettings} />}
      </ul>
      <ul>
        <CustomLink to="/profile" Icon={MdFace} />
      </ul>
    </Container>
  );
}

Menu.propTypes = { isAdminMasterState: PropTypes.bool };
Menu.defaultProps = { isAdminMasterState: false };

CustomLink.propTypes = {
  to: PropTypes.string.isRequired,
  Icon: PropTypes.func.isRequired,
};
