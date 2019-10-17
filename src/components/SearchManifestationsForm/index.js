import React from 'react';
import { Input } from '@rocketseat/unform';
import { CircleSpinner } from 'react-spinners-kit';
import { MdSearch } from 'react-icons/md';
import { object, string } from 'yup';
import PropTypes from 'prop-types';

import Select from '../Select';
import { StyledForm, TextInput, selectStyle } from './styles';

export default function SearchManifestationsForm({
  onSubmit,
  loading,
  tagsOptions,
}) {
  const validationSchema = object().shape({
    text: string().required('Esse campo é necessário'),
  });

  return (
    <StyledForm onSubmit={onSubmit} schema={validationSchema}>
      <TextInput>
        <Input name="text" placeholder="Protocolo ou título" />
        <button type="button">
          {loading ? (
            <CircleSpinner size={15} color="rgba(0, 0, 0, 0.5)" />
          ) : (
            <MdSearch />
          )}
        </button>
      </TextInput>
      <Select name="tags" options={tagsOptions} styles={selectStyle} multiple />
    </StyledForm>
  );
}

SearchManifestationsForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  tagsOptions: PropTypes.arrayOf({
    id: PropTypes.number,
    title: PropTypes.string,
  }).isRequired,
};
