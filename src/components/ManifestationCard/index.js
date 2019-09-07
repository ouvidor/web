import React from 'react';
import PropTypes from 'prop-types';
import { MdThumbUp, MdChevronRight } from 'react-icons/md';

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
        <div>
          <MdThumbUp /> {upvotes}
        </div>
        <button type="button">
          abrir <MdChevronRight />
        </button>
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
