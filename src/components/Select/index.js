import React from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';

import { basic, alternative } from './styles';

export default function ReactSelect({
  label,
  name,
  options,
  multiple,
  alternativeStyle,
  value,
  onChange,
  onBlur,
  error,
  touched,
  ...rest
}) {
  function handleChange(v) {
    onChange(name, v);
  }

  function handleBlur() {
    onBlur(name, true);
  }

  return (
    <>
      {label && <label htmlFor={name}>{label}</label>}
      <Select
        id={name}
        options={options}
        isMulti={multiple}
        styles={alternativeStyle ? alternative : basic}
        aria-label={name}
        getOptionValue={option => option.id}
        // o texto que aparece
        getOptionLabel={option => option.title}
        isSearchable
        placeholder="Opções..."
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        {...rest}
      />

      {!!error && touched && <span>{error}</span>}
    </>
  );
}

ReactSelect.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
    })
  ).isRequired,
  multiple: PropTypes.bool,
  alternativeStyle: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  value: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
    })
  ).isRequired,
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

ReactSelect.defaultProps = {
  label: null,
  multiple: false,
  alternativeStyle: false,
  error: undefined,
  touched: undefined,
};
