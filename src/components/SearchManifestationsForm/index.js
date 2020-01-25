import React, { useState, useEffect } from 'react';
import { Formik, Field } from 'formik';
import { CircleSpinner } from 'react-spinners-kit';
import { MdSearch } from 'react-icons/md';
import { object, string, array } from 'yup';
import PropTypes from 'prop-types';

import { toast } from 'react-toastify';
import Select from '../Select';
import { StyledForm, TextInputContainer } from './styles';
import Api from '../../services/api';

export default function SearchManifestationsForm({ onSubmit, loading }) {
  const [options, setOptions] = useState([]);

  const validationSchema = object().shape({
    text: string(),
    options: array()
      .of(string())
      .nullable(),
  });

  // pega as categorias e tipos e coloca nas opções
  useEffect(() => {
    const loadOptions = async () => {
      try {
        const types = await Api.get({ pathUrl: 'type' });
        const categories = await Api.get({ pathUrl: 'category' });
        // o id não vai ser importante, vai ser o title que vai ser usado para pesquisar no backend
        setOptions([...types, ...categories]);
      } catch (error) {
        toast.error('Não pôde buscar as opções de pesquisa do servidor');
      }
    };
    loadOptions();
  }, []);

  return (
    <Formik
      initialValues={{ text: '', options: [] }}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ values, errors, touched, setFieldValue, setFieldTouched }) => (
        <StyledForm>
          <TextInputContainer>
            <Field name="text" type="text" placeholder="Protocolo ou título" />
            <button type="submit">
              {loading ? (
                <CircleSpinner size={15} color="rgba(255, 255, 255, 0.6)" />
              ) : (
                <MdSearch />
              )}
            </button>
          </TextInputContainer>
          <Select
            name="options"
            options={options}
            multiple
            multipleTypes
            value={values.options}
            onChange={setFieldValue}
            onBlur={setFieldTouched}
            error={errors.options}
            touched={touched.options}
          />
        </StyledForm>
      )}
    </Formik>
  );
}

SearchManifestationsForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};

SearchManifestationsForm.defaultProps = { loading: false };
