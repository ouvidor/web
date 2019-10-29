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

const CustomLink = ({ to, Icon, activePath }) => (
  <Item>
    <Link to={to}>
      <Icon />
    </Link>
    {to === activePath && <ActiveIndicator />}
  </Item>
);

export default function Menu({ isAdminMasterState }) {
  // pega o token e checa a Role
  const token = useSelector(state => state.auth.token);
  const tokenPayload = token && decodeJWT(token);
  const role = tokenPayload && tokenPayload.role[0];
  const isAdminMaster = (role && role.title === 'master') || isAdminMasterState;

  const { pathname } = useLocation();

  return (
    <Container>
      <ul>
        <CustomLink to="/map" Icon={MdMap} activePath={pathname} />
        <CustomLink to="/recent" Icon={MdVisibility} activePath={pathname} />
        <CustomLink to="/create" Icon={MdCreate} activePath={pathname} />
        <CustomLink to="/statistics" Icon={MdEqualizer} activePath={pathname} />
        <CustomLink to="/send" Icon={MdSend} activePath={pathname} />
        <CustomLink to="/email" Icon={MdEmail} activePath={pathname} />
        {isAdminMaster && (
          <CustomLink to="/settings" Icon={MdSettings} activePath={pathname} />
        )}
      </ul>
      <ul>
        <CustomLink to="/profile" Icon={MdFace} activePath={pathname} />
      </ul>
    </Container>
  );
}

Menu.propTypes = { isAdminMasterState: PropTypes.bool };
Menu.defaultProps = { isAdminMasterState: false };

CustomLink.propTypes = {
  to: PropTypes.string.isRequired,
  Icon: PropTypes.func.isRequired,
  activePath: PropTypes.string.isRequired,
};
