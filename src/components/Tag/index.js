import React from 'react';
import PropTypes from 'prop-types';
import { MdClear } from 'react-icons/md';

import { Container } from './styles';

export default function Tag({ tag, onDelete }) {
  const { id, name } = tag;
  return (
    <Container key={id}>
      <span>{name}</span>
      {onDelete && (
        <button type="button" onClick={onDelete}>
          <MdClear />
        </button>
      )}
    </Container>
  );
}

Tag.propTypes = {
  tag: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  }).isRequired,
  onDelete: PropTypes.func,
};

Tag.defaultProps = {
  onDelete: undefined,
};
