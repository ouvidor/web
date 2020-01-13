import React from 'react';
import PropTypes from 'prop-types';

import { Container } from './styles';

export default function Tag({ tag }) {
  const { id, title } = tag;
  return (
    <Container key={id}>
      <span>{title}</span>
    </Container>
  );
}

Tag.propTypes = {
  tag: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
  }).isRequired,
};
