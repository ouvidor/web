/**
 * Wrapper sobre o Field do formik
 */
import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useField } from 'formik';

import { FieldError } from '../../../styles';
import { Container } from './styles';

function Field({ label, name, component, ...props }) {
  const [height, setHeight] = useState(0);
  const [field, meta] = useField({ ...props, name });
  const containerRef = useRef(null);

  useEffect(() => {
    setHeight(containerRef.current.clientHeight);
  }, []);

  return (
    <Container ref={containerRef}>
      {label && <label htmlFor={name}>{label}</label>}
      {component === 'textarea' ? (
        <textarea {...field} {...props} name={name} />
      ) : (
        <input {...field} {...props} name={name} />
      )}
      {meta.touched && meta.error ? (
        <FieldError height={height}>{meta.error}</FieldError>
      ) : null}
    </Container>
  );
}

Field.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  component: PropTypes.string,
};

Field.defaultProps = {
  label: undefined,
  component: 'text',
};

export default Field;
