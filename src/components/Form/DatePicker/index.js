import React from 'react';
import VendorDatePicker from 'react-date-picker';

// import { Container } from './styles';

const Datepicker = ({ label, name, ...props }) => (
  <div>
    {label && <label htmlFor={name}>{name}</label>}
    <VendorDatePicker name={name} {...props} />
  </div>
);

export default Datepicker;
