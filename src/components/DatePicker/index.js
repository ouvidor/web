import React from 'react';
import ReactDatePicker from 'react-datepicker';
import PropTypes from 'prop-types';

import 'react-datepicker/dist/react-datepicker.css';

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
      {!!error && touched && <span>{error}</span>}
    </>
  );
}

DatePicker.propTypes = {
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  error: PropTypes.string.isRequired,
  touched: PropTypes.bool.isRequired,
};
