import React from 'react';
import { Input } from '@rocketseat/unform';
import { CircleSpinner } from 'react-spinners-kit';
import { MdSearch } from 'react-icons/md';
import { object, string, array } from 'yup';
import PropTypes from 'prop-types';

import Select from '../Select';
import { StyledForm, TextInput } from './styles';

export default function SearchManifestationsForm({
  onSubmit,
  loading,
  tagsOptions,
}) {
  const validationSchema = object().shape({
    text: string().required('Esse campo é necessário'),
    tags: array(),
  });

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
      <Select name="tags" options={tagsOptions} multiple />
    </StyledForm>
  );
}

SearchManifestationsForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  tagsOptions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
    })
  ).isRequired,
};

SearchManifestationsForm.defaultProps = { loading: false };
