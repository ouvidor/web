import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ErrorMessage, useFormContext } from 'react-hook-form';

import { FieldError } from '../../../styles';
import { Container } from './styles';

function Field({ label, name, component, ...props }) {
  const [height, setHeight] = useState(0);
  const { register, errors } = useFormContext();
  const containerRef = useRef(null);

  useEffect(() => {
    setHeight(containerRef.current.clientHeight);
  }, []);

  return (
    <Container ref={containerRef}>
      {label && <label htmlFor={name}>{label}</label>}

      {component === 'textarea' ? (
        <textarea ref={register} {...props} name={name} />
      ) : (
        <input ref={register} {...props} name={name} />
      )}

      <ErrorMessage errors={errors} name={name}>
        {({ message }) => <FieldError height={height}>{message}</FieldError>}
      </ErrorMessage>
    </Container>
  );
}

Field.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  component: PropTypes.oneOf(['text', 'textarea']),
  errors: PropTypes.func,
};

Field.defaultProps = {
  label: undefined,
  component: 'text',
  errors: undefined,
};

export default Field;
