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

const CustomLink = ({ to, IconComponent, activePath }) => (
  <Item>
    <Link to={to}>
      <IconComponent />
    </Link>
    {to === activePath && <ActiveIndicator />}
  </Item>
);

export default function Menu({ adminLeaderStatus }) {
  const isAdminLeader = useSelector(
    state => adminLeaderStatus || state.admin.isLeader
  );

  const location = useLocation();

  return (
    <Container>
      <ul>
        <CustomLink
          to="/map"
          IconComponent={MdMap}
          activePath={location.pathname}
        />
        <CustomLink
          to="/recent"
          IconComponent={MdVisibility}
          activePath={location.pathname}
        />
        <CustomLink
          to="/create"
          IconComponent={MdCreate}
          activePath={location.pathname}
        />
        <CustomLink
          to="/statistics"
          IconComponent={MdEqualizer}
          activePath={location.pathname}
        />
        <CustomLink
          to="/send"
          IconComponent={MdSend}
          activePath={location.pathname}
        />
        <CustomLink
          to="/email"
          IconComponent={MdEmail}
          activePath={location.pathname}
        />
        {isAdminLeader && (
          <CustomLink
            to="/settings"
            IconComponent={MdSettings}
            activePath={location.pathname}
          />
        )}
      </ul>
      <ul>
        <CustomLink
          to="/profile"
          IconComponent={MdFace}
          activePath={location.pathname}
        />
        <CustomLink
          to="/info"
          IconComponent={MdInfo}
          activePath={location.pathname}
        />
      </ul>
    </Container>
  );
}

Menu.propTypes = { adminLeaderStatus: PropTypes.bool };
Menu.defaultProps = { adminLeaderStatus: false };

CustomLink.propTypes = {
  to: PropTypes.string.isRequired,
  IconComponent: PropTypes.element.isRequired,
  activePath: PropTypes.string.isRequired,
};
