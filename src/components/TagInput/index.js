/**
 * Wrapper para o componente da lib 'react-tag-autocomplete'
 * https://github.com/i-like-robots/react-tags
 * Esse componente puxa as sugestões da API
 */

import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import TagInput from 'react-tag-autocomplete';

import './styles.css';

import Tag from '../Tag';

export default function TagInputWrapper({ tags, setTags, suggestionsState }) {
  const suggestions = useSelector(
    state => suggestionsState || state.categories
  );

  function handleAddition(tag) {
    // maximo de duas tags para evitar bugs na interface
    if (tags.length >= 2) return;
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
      placeholder="Categorias"
      clearInputOnDelete={false}
      tagComponent={Tag}
      maxSuggestionsLength={20}
      // test
      allowNew
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
