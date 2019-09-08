/**
 * Wrapper para o componente da lib 'react-tag-autocomplete'
 * https://github.com/i-like-robots/react-tags
 * Esse componente puxa as sugestões da API
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TagInput from 'react-tag-autocomplete';

import './styles.css';

import Tag from '../Tag';

export default function TagInputWrapper({ tags, setTags, suggestionsState }) {
  const [suggestions] = useState(suggestionsState);

  // TODO useEffect para requisitar as sugestões da API

  function handleAddition(tag) {
    setTags([...tags, tag]);
  }

  function handleDelete(position) {
    setTags(tags.filter((_, i) => i !== position));
  }

  return (
    <TagInput
      suggestions={suggestions}
      tags={tags}
      handleAddition={handleAddition}
      handleDelete={handleDelete}
      autofocus={false}
      minQueryLength={1}
      placeholder="Insira uma tag"
      clearInputOnDelete={false}
      tagComponent={Tag}
    />
  );
}

TagInputWrapper.propTypes = {
  suggestionsState: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    })
  ),
  tags: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    })
  ).isRequired,
  setTags: PropTypes.func.isRequired,
};

TagInputWrapper.defaultProps = {
  suggestionsState: [],
};
