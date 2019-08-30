/**
 * Componentes lista as tags que a reclamação tem
 */
import React from 'react';
import PropTypes from 'prop-types';

import Tag from '../Tag';
import { List } from './styles';

export default function TagsList({ tags }) {
  return (
    <List>
      {tags && tags.map(tag => <Tag id={tag.id} title={tag.title} />)}
    </List>
  );
}

TagsList.propTypes = {
  tags: PropTypes.arrayOf([PropTypes.number, PropTypes.string]),
};

TagsList.defaultProps = {
  tags: [],
};
