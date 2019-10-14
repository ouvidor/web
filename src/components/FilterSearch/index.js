/**
 * Componente de pesquisa com filtragem
 * Pode filtrar local, titulo, descrição
 */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { MdSearch } from 'react-icons/md';
import { CircleSpinner } from 'react-spinners-kit';

import TagInput from '../TagInput';
import { Container } from './styles';

export default function FilterSearch({
  textState,
  loadingState,
  tagsState,
  suggestionsState,
}) {
  const [text, setText] = useState(textState);
  const [loading, setLoading] = useState(loadingState);
  const [tags, setTags] = useState(tagsState);

  function handleSearch() {
    setLoading(true);
    // TODO fazer pesquisa quando clicado
    // a pesquisa deve usar o text e as tags
    setLoading(false);
  }

  return (
    <Container>
      <div>
        <input
          title="pesquisar"
          aria-label="pesquisar"
          placeholder="Pesquisar por título ou protocolo"
          value={text}
          onChange={e => setText(e.target.value)}
        />
        <button type="button" onClick={handleSearch} aria-label="Pesquisar">
          {loading ? (
            <CircleSpinner size={15} color="rgba(0,0,0,0.5)" />
          ) : (
            <MdSearch />
          )}
        </button>
      </div>

      <TagInput
        tags={tags}
        setTags={setTags}
        suggestionsState={suggestionsState}
      />
    </Container>
  );
}

FilterSearch.propTypes = {
  textState: PropTypes.string,
  loadingState: PropTypes.bool,
  tagsState: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      label: PropTypes.string,
    })
  ),
  suggestionsState: PropTypes.arrayOf(
    PropTypes.shape({ id: PropTypes.number, name: PropTypes.string })
  ),
};

FilterSearch.defaultProps = {
  textState: '',
  loadingState: false,
  tagsState: [],
  suggestionsState: [],
};
