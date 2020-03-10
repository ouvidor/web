import React from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';

import Field from '../Form/Field';
import { StyledForm } from './styles';
import { searchByProtocolSchema } from '../../validations';

const SearchManifestationByProtocol = ({ handleFetch, label }) => {
  const { register, handleSubmit, errors } = useForm({
    validationSchema: searchByProtocolSchema,
  });

  return (
    <>
      <h1>{label}</h1>
      <StyledForm onSubmit={handleSubmit(handleFetch)}>
        <Field
          placeholder="Exemplo: k6f7ju38"
          name="protocol"
          label="Protocolo"
          register={register}
          errors={errors}
        />
        <button type="submit">Buscar</button>
      </StyledForm>
    </>
  );
};

SearchManifestationByProtocol.propTypes = {
  handleFetch: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
};

export default SearchManifestationByProtocol;
