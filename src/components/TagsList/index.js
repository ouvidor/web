/**
 * Componentes lista as tags que a reclamação tem
 */
import React from 'react';
import PropTypes from 'prop-types';

import { List } from './styles';

export default function TagsList({ tags }) {
  return (
    <List>{tags && tags.map(tag => <li key={tag.id}>{tag.title}</li>)}</List>
  );
}

TagsList.propTypes = {
  tags: PropTypes.arrayOf([PropTypes.number, PropTypes.string]),
};

TagsList.defaultProps = {
  tags: [],
};
