/**
 * Componente de pesquisa com filtragem
 * Pode filtrar local, titulo, descrição
 */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { MdSearch, MdClear } from 'react-icons/md';
import { CircleSpinner } from 'react-spinners-kit';

import InputTag from '../InputTag';
import {
  Container,
  SearchInput,
  SearchButton,
  TagFilterContainer,
  ClearTagsButton,
} from './styles';

export default function FilterSearch({ textState, loadingState, tagsState }) {
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
        <SearchInput
          placeholder="Pesquisar por título, descrição ou local"
          value={text}
          onChange={e => setText(e.target.value)}
        />
        <SearchButton onClick={handleSearch}>
          {loading ? (
            <CircleSpinner size={15} color="rgba(0,0,0,0.5)" />
          ) : (
            <MdSearch />
          )}
        </SearchButton>
      </div>

      <TagFilterContainer>
        <ClearTagsButton>
          <MdClear /> excluir
        </ClearTagsButton>
        <span>filtros:</span>
        <InputTag tags={tags} setTags={setTags} />
      </TagFilterContainer>
    </Container>
  );
}
FilterSearch.propTypes = {
  textState: PropTypes.string,
  loadingState: PropTypes.bool,
  tagsState: PropTypes.arrayOf(PropTypes.string),
};
FilterSearch.defaultProps = {
  textState: '',
  loadingState: false,
  tagsState: [],
};
