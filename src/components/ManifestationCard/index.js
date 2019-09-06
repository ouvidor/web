import React from 'react';
import PropTypes from 'prop-types';

import { Container } from './styles';

export default function Manifestation({ manifestation }) {
  const { title, tags, upvotes } = manifestation;
  return (
    <Container>
      <header>
        <h1>{title}</h1>
        <ul>{tags && tags.map(tag => <li key={tag}>{tag}</li>)}</ul>
      </header>

      <footer>
        <div>{upvotes}</div>
        <button type="button">abrir</button>
      </footer>
    </Container>
  );
}

Manifestation.propTypes = {
  manifestation: PropTypes.shape({
    title: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
    upvotes: PropTypes.number,
  }),
};

Manifestation.defaultProps = {
  manifestation: {
    title: 'Título',
    tags: [],
    upvotes: 0,
  },
};
