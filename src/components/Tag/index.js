import React from 'react';
import PropTypes from 'prop-types';

import { Container } from './styles';

export default function Tag({ id, title, fontColor, backgroundColor }) {
  return (
    <Container key={id} background={backgroundColor} color={fontColor}>
      {title}
    </Container>
  );
}

Tag.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  fontColor: PropTypes.string,
  backgroundColor: PropTypes.string,
};

Tag.defaultProps = {
  fontColor: '#2d2d2d',
  backgroundColor: '#eee',
};
