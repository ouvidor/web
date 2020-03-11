import React from 'react';
import ReactSelect from 'react-select';
import { ErrorMessage } from 'react-hook-form';
import PropTypes from 'prop-types';

import { FieldError } from '../../../styles';
import { basic, alternative, Container, GroupLabelContainer } from './styles';

export default function Select({
  label,
  name,
  alternativeStyle,
  errors,
  options,
  multiple,
  ...props
}) {
  const formatGroupLabel = data => (
    <GroupLabelContainer>
      <span>{data.label}</span>
      <span>{data.options.length}</span>
    </GroupLabelContainer>
  );

  return (
    <Container>
      {label && <label htmlFor={name}>{label}</label>}
      <ReactSelect
        styles={alternativeStyle ? alternative : basic}
        getOptionValue={option => option.id}
        getOptionLabel={option => option.title}
        name={name}
        isMulti={multiple}
        options={options}
        formatGroupLabel={multiple && formatGroupLabel}
        {...props}
      />
      <ErrorMessage name={name} errors={errors}>
        {({ message }) => <FieldError>{message}</FieldError>}
      </ErrorMessage>
    </Container>
  );
}

Select.defaultProps = {
  label: undefined,
  name: undefined,
  alternativeStyle: false,
  errors: {},
  multiple: false,
  options: [],
};

Select.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  alternativeStyle: PropTypes.bool,
  errors: PropTypes.shape({}),
  multiple: PropTypes.bool,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
    })
  ),
};
