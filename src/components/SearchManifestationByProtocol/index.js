import React from 'react';
import PropTypes from 'prop-types';
import { useForm, FormContext } from 'react-hook-form';

import Field from '../Form/Field';
import { StyledForm } from './styles';
import { searchByProtocolSchema } from '../../validations';

const SearchManifestationByProtocol = ({ handleFetch, label }) => {
  const form = useForm({
    validationSchema: searchByProtocolSchema,
  });

  return (
    <FormContext {...form}>
      <h1>{label}</h1>
      <StyledForm onSubmit={form.handleSubmit(handleFetch)}>
        <Field
          placeholder="Exemplo: k6f7ju38"
          name="protocol"
          label="Protocolo"
        />
        <button type="submit">Buscar</button>
      </StyledForm>
    </FormContext>
  );
};

SearchManifestationByProtocol.propTypes = {
  handleFetch: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
};

export default SearchManifestationByProtocol;
