import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';

import { StyledForm } from './styles';

export default function SearchManifestationByProtocol({ handleFetch, label }) {
  const validationSchema = Yup.object().shape({
    protocol: Yup.string().required('O protocolo é necessário'),
  });

  return (
    <>
      <h1>{label}</h1>
      <Formik
        initialValues={{ protocol: '' }}
        validationSchema={validationSchema}
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
}

SearchManifestationByProtocol.propTypes = {
  handleFetch: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
};
