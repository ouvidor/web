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

export default function FilterSearch({ textState, loadingState }) {
  const [text, setText] = useState(textState);
  const [loading, setLoading] = useState(loadingState);

  return (
    <Container>
      <div>
        <SearchInput
          placeholder="Pesquisar por título, descrição ou local"
          value={text}
          onChange={e => setText(e.target.value)}
        />
        <SearchButton>
          {loading ? (
            <CircleSpinner size={20} color="rgba(0,0,0,0.5)" />
          ) : (
            <MdSearch />
          )}
        </SearchButton>
      </div>

      <TagFilterContainer>
        <ClearTagsButton>
          <MdClear /> excluir
        </ClearTagsButton>
        filtros:
        <InputTag />
      </TagFilterContainer>
    </Container>
  );
}
FilterSearch.propTypes = {
  textState: PropTypes.string,
  loadingState: PropTypes.bool,
};
FilterSearch.defaultProps = {
  textState: '',
  loadingState: false,
};
