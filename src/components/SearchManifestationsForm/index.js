import React, { useState, useEffect } from 'react';
import { Input } from '@rocketseat/unform';
import { CircleSpinner } from 'react-spinners-kit';
import { MdSearch } from 'react-icons/md';
import { object, string, array } from 'yup';
import PropTypes from 'prop-types';

import { toast } from 'react-toastify';
import Select from '../Select';
import { StyledForm, TextInput } from './styles';
import api from '../../services/api';

export default function SearchManifestationsForm({ onSubmit, loading }) {
  const validationSchema = object().shape({
    text: string().required('Esse campo é necessário'),
    options: array().of(string()),
  });
  const [options, setOptions] = useState([]);

  async function fetchFromAPI(pathUrl) {
    const { data } = await api.get(pathUrl);
    return data;
  }

  // pega as categorias e tipos e coloca nas opções
  useEffect(() => {
    const loadOptions = async () => {
      try {
        const types = await fetchFromAPI('type');
        const categories = await fetchFromAPI('category');

        // o id não vai ser importante, vai ser o title que vai ser usado para pesquisar no backend
        setOptions([...types, ...categories]);
      } catch (error) {
        toast.error('Não pôde buscar as opções de pesquisa do servidor');
      }
    };
    loadOptions();
  }, []);

  return (
    <StyledForm onSubmit={onSubmit} schema={validationSchema}>
      <TextInput>
        <Input name="text" placeholder="Protocolo ou título" />
        <button type="submit">
          {loading ? (
            <CircleSpinner size={15} color="rgba(255, 255, 255, 0.6)" />
          ) : (
            <MdSearch />
          )}
        </button>
      </TextInput>
      <Select name="options" options={options} multiple />
    </StyledForm>
  );
}

SearchManifestationsForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};

SearchManifestationsForm.defaultProps = { loading: false };
