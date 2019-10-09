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
  MdInfo,
} from 'react-icons/md';

import { Container, Item, ActiveIndicator } from './styles';

const CustomLink = ({ to, Icon, activePath }) => (
  <Item>
    <Link to={to}>
      <Icon />
    </Link>
    {to === activePath && <ActiveIndicator />}
  </Item>
);

export default function Menu({ adminLeaderStatus }) {
  const isAdminLeader = useSelector(
    state => adminLeaderStatus || state.admin.isLeader
  );

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
        {isAdminLeader && (
          <CustomLink to="/settings" Icon={MdSettings} activePath={pathname} />
        )}
      </ul>
      <ul>
        <CustomLink to="/profile" Icon={MdFace} activePath={pathname} />
        <CustomLink to="/info" Icon={MdInfo} activePath={pathname} />
      </ul>
    </Container>
  );
}

Menu.propTypes = { adminLeaderStatus: PropTypes.bool };
Menu.defaultProps = { adminLeaderStatus: false };

CustomLink.propTypes = {
  to: PropTypes.string.isRequired,
  Icon: PropTypes.func.isRequired,
  activePath: PropTypes.string.isRequired,
};
