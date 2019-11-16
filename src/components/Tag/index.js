import React from 'react';
import PropTypes from 'prop-types';
import { MdClear } from 'react-icons/md';

import { Container } from './styles';

export default function Tag({ tag, onDelete }) {
  const { id, title } = tag;
  return (
    <Container key={id}>
      <span>{title}</span>
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
    title: PropTypes.string,
  }).isRequired,
  onDelete: PropTypes.func,
};

Tag.defaultProps = {
  onDelete: undefined,
};
