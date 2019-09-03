/**
 * Componente Wrapper para colocar um Menu no canto
 */
import React from 'react';
import PropTypes from 'prop-types';

import { Wrapper, Menu } from './styles';

export default function DefaultLayout({ children }) {
  return (
    <Wrapper>
      <Menu />
      {children}
    </Wrapper>
  );
}

DefaultLayout.propTypes = {
  children: PropTypes.element.isRequired,
};
