import React from 'react';
import ReactSelect from 'react-select';
import { ErrorMessage } from 'react-hook-form';

import { FieldError } from '../../../styles';
import { basic, alternative, Container } from './styles';

export default function Select({
  label,
  name,
  alternativeStyle,
  errors,
  multiple,
  ...props
}) {
  return (
    <Container>
      {label && <label htmlFor={name}>{label}</label>}
      <ReactSelect
        styles={alternativeStyle ? alternative : basic}
        getOptionValue={option => option.id}
        getOptionLabel={option => option.title}
        name={name}
        isMulti={multiple}
        {...props}
      />
      <ErrorMessage name={name} errors={errors}>
        {({ message }) => <FieldError>{message}</FieldError>}
      </ErrorMessage>
    </Container>
  );
}
