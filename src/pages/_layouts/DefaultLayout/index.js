/**
 * Componente Wrapper para colocar um Menu no canto
 */
import React from 'react';
import PropTypes from 'prop-types';

import Menu from '../../../components/Menu';
import { Wrapper } from './styles';

export default function DefaultLayout({ children }) {
  return (
    <>
      <Menu />
      <Wrapper>{children}</Wrapper>
    </>
  );
}

DefaultLayout.propTypes = {
  children: PropTypes.element.isRequired,
};
