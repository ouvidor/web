import React from 'react';
import PropTypes from 'prop-types';

import Tag from '../Tag';
import { Container, TagList } from './styles';

export default function ManifestationCard({ manifestation }) {
  const { title, tags } = manifestation;

  return (
    <Container>
      <section>
        <h1>{title}</h1>
        <div />
      </section>

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
    title: '',
    tags: [],
  },
};
