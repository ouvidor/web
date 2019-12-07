import React, { useRef, useEffect } from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';

import { useField } from '@rocketseat/unform';
import { basic, alternative } from './styles';

export default function ReactSelect({
  name,
  label,
  options,
  multiple,
  alternativeStyle,
  multipleTypes,
  returnObject,
  ...rest
}) {
  const ref = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);

  // formatação do valor retornado
  function parseSelectValue(selectRef) {
    // caso receba multiplos tipos de opções retorna o titulo, pois o id já não é tão importante
    if (multipleTypes) {
      const selectValue = selectRef.state.value;
      if (!multiple) {
        return selectValue ? selectValue.title : '';
      }

      return selectValue ? selectValue.map(option => option.title) : [];
    }

    // caso queira retornar o objeto inteiro
    if (returnObject) {
      const selectValue = selectRef.state.value;
      if (!multiple) {
        return selectValue || '';
      }

      return selectValue || [];
    }

    // caso não receba multiplos tipos o id continua sendo importante
    const selectValue = selectRef.state.value;
    if (!multiple) {
      return selectValue ? selectValue.id : '';
    }

    return selectValue ? selectValue.map(option => option.id) : [];
  }

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: ref.current,
      path: 'state.value',
      parseValue: parseSelectValue,
      clearValue: selectRef => {
        selectRef.select.clearValue();
      },
    });
  }, [ref.current, fieldName]); // eslint-disable-line

  function getDefaultValue() {
    if (!defaultValue) return null;

    if (!multiple) {
      return options.find(option => option.id === defaultValue);
    }

    return options.filter(option => defaultValue.includes(option.id));
  }

  return (
    <>
      {label && <label htmlFor={fieldName}>{label}</label>}

      <Select
        name={fieldName}
        styles={alternativeStyle ? alternative : basic}
        aria-label={fieldName}
        options={options}
        isMulti={multiple}
        defaultValue={getDefaultValue()}
        ref={ref}
        getOptionValue={option => option.id}
        // o texto que aparece
        getOptionLabel={option => option.title}
        isSearchable
        placeholder="Opções..."
        {...rest}
      />

      {error && <span>{error}</span>}
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
  multipleTypes: PropTypes.bool,
  returnObject: PropTypes.bool,
};

ReactSelect.defaultProps = {
  label: null,
  multiple: false,
  alternativeStyle: false,
  multipleTypes: false,
  returnObject: false,
};
