import React from 'react';
import ReactDatePicker from 'react-datepicker';
import PropTypes from 'prop-types';

import 'react-datepicker/dist/react-datepicker.css';
import { FieldError } from '../../../styles';

export default function DatePicker({
  onChange,
  onBlur,
  name,
  value,
  placeholder,
  error,
  touched,
}) {
  function handleChange(option) {
    onChange(name, option);
  }

  function handleBlur() {
    onBlur(name, true);
  }

  return (
    <>
      <ReactDatePicker
        name={name}
        selected={value}
        placeholderText={placeholder}
        autoComplete="off"
        onChange={handleChange}
        onBlur={handleBlur}
        timeFormat="HH:mm"
        dateFormat="dd/MM/yyyy"
      />
      {!!error && touched && <FieldError>{error}</FieldError>}
    </>
  );
}

DatePicker.propTypes = {
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  error: PropTypes.string,
  touched: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.bool,
        title: PropTypes.bool,
      })
    ),
  ]),
};

DatePicker.defaultProps = {
  error: undefined,
  touched: undefined,
};
