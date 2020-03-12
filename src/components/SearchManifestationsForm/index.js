import React, { useState, useEffect } from 'react';
import { useForm, FormContext, Controller } from 'react-hook-form';
import { CircleSpinner } from 'react-spinners-kit';
import { MdSearch } from 'react-icons/md';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import nanoid from 'nanoid';

import Select from '../Form/Select';
import Field from '../Form/Field';
import { StyledForm, TextInputContainer } from './styles';
import Api from '../../services/api';
import { searchManifestationsSchema } from '../../validations';

export default function SearchManifestationsForm({ setSearchData, loading }) {
  const [options, setOptions] = useState([]);

  const form = useForm({
    validationSchema: searchManifestationsSchema,
  });

  // pega as categorias e tipos e coloca nas opções
  useEffect(() => {
    const loadOptions = async () => {
      try {
        const types = await Api.get({ pathUrl: 'type' });
        const categories = await Api.get({ pathUrl: 'category' });
        // Gera IDs randomicos seguros para não conflitarem entre si
        const typesWithRandomId = types.map(type => ({
          title: type.title,
          id: nanoid(),
        }));
        const categoriesWithRandomId = categories.map(category => ({
          title: category.title,
          id: nanoid(),
        }));
        const groupedOptions = [
          { label: 'Tipos', options: typesWithRandomId },
          { label: 'Categorias', options: categoriesWithRandomId },
        ];
        setOptions(groupedOptions);
      } catch (error) {
        toast.error('Não pôde buscar as opções de pesquisa do servidor');
      }
    };
    loadOptions();
  }, []);

  function handleSubmitClick(data) {
    // filtrar opções
    let formattedArrayOfSelections = [];
    if (Array.isArray(data.selections)) {
      formattedArrayOfSelections = data.selections.map(
        selection => selection.title
      );
    }
    const formattedOptions = {
      text: data.text,
      options: formattedArrayOfSelections,
    };
    setSearchData(formattedOptions);
  }

  return (
    <FormContext {...form}>
      <StyledForm onSubmit={form.handleSubmit(handleSubmitClick)}>
        <TextInputContainer>
          <Field name="text" placeholder="Protocolo ou título" />

          <button type="submit">
            {loading ? (
              <CircleSpinner size={15} color="rgba(255, 255, 255, 0.6)" />
            ) : (
              <MdSearch />
            )}
          </button>
        </TextInputContainer>
        <Controller
          as={<Select multiple options={options} />}
          control={form.control}
          name="selections"
          placeholder="Filtros"
        />
      </StyledForm>
    </FormContext>
  );
}

SearchManifestationsForm.propTypes = {
  setSearchData: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};

SearchManifestationsForm.defaultProps = { loading: false };
