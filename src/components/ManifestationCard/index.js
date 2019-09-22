import React from 'react';
import PropTypes from 'prop-types';
import { MdThumbUp, MdChevronRight } from 'react-icons/md';

import Tag from '../Tag';
import { Container } from './styles';

export default function ManifestationCard({ manifestation }) {
  const { title, tags, upvotes } = manifestation;

  return (
    <Container>
      <header>
        <h1>{title}</h1>
        {tags && tags.map(tag => <Tag key={tag} tag={tag} />)}
      </header>

      <footer>
        <section>
          <MdThumbUp /> {upvotes}
        </section>
        <button type="button">
          abrir <MdChevronRight />
        </button>
      </footer>
    </Container>
  );
}

ManifestationCard.propTypes = {
  manifestation: PropTypes.shape({
    title: PropTypes.string,
    tags: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string,
      })
    ),
    upvotes: PropTypes.number,
  }),
};

ManifestationCard.defaultProps = {
  manifestation: {
    title: 'Título',
    tags: [],
    upvotes: 0,
  },
};
