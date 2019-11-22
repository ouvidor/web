import React from 'react';
import PropTypes from 'prop-types';

import Tag from '../Tag';
import { Container, TagList } from './styles';

export default function ManifestationCard({ manifestation, handleClick }) {
  const { title, categories, type } = manifestation;

  const tags = [...categories, type];

  return (
    <Container onClick={handleClick}>
      <span>{title}</span>

      <section>
        <div />
        <TagList>
          {tags && tags.map(tag => <Tag key={tag.title} tag={tag} />)}
        </TagList>
      </section>
    </Container>
  );
}

ManifestationCard.propTypes = {
  manifestation: PropTypes.shape({
    title: PropTypes.string,
    categories: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string,
      })
    ),
    type: PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
    }),
  }).isRequired,
  handleClick: PropTypes.func.isRequired,
};
