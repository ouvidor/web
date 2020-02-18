import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Field } from 'formik';

import { StyledForm } from './styles';
import { searchByProtocolSchema } from '../../validations';

const SearchManifestationByProtocol = ({ handleFetch, label }) => (
  <>
    <h1>{label}</h1>
    <Formik
      initialValues={{ protocol: '' }}
      validationSchema={searchByProtocolSchema}
      onSubmit={handleFetch}
    >
      <StyledForm>
        <Field
          placeholder="Exemplo: k6f7ju38"
          name="protocol"
          label="Protocolo"
        />
        <button type="submit">Buscar</button>
      </StyledForm>
    </Formik>
  </>
);

SearchManifestationByProtocol.propTypes = {
  handleFetch: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
};

export default SearchManifestationByProtocol;
