import React from 'react';
import PropTypes from 'prop-types';
import { MdClear } from 'react-icons/md';

import { Container } from './styles';

export default function Tag({ tag, onDelete }) {
  const { id, label, background, color } = tag;
  return (
    <Container key={id} background={background} color={color}>
      <span>{label}</span>
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
    label: PropTypes.string,
    color: PropTypes.string,
    background: PropTypes.string,
  }).isRequired,
  onDelete: PropTypes.func,
};

Tag.defaultProps = {
  onDelete: undefined,
};
