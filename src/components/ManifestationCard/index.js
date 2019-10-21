import React from 'react';
import PropTypes from 'prop-types';

import Tag from '../Tag';
import { Container, TagList } from './styles';

export default function ManifestationCard({ manifestation }) {
  const { title, tags } = manifestation;

  return (
    <Container>
      <header>
        <section>
          <h1>{title}</h1>
        </section>
        <article>
          <div />
        </article>
      </header>

      <TagList>{tags && tags.map(tag => <Tag key={tag} tag={tag} />)}</TagList>
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
  }),
};

ManifestationCard.defaultProps = {
  manifestation: {
    title: 'Título',
    tags: [],
  },
};
