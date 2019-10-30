/**
 * Container retratil para editar os items do sistema
 */
import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { CircleSpinner } from 'react-spinners-kit';
import { MdClear } from 'react-icons/md';
import { GoChevronDown, GoChevronUp } from 'react-icons/go';
import { Container } from './styles';
import SettingsItem from './SettingsItem';

export default function SettingsContainer({
  loading,
  error,
  items,
  email,
  title,
  placeholder,
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Container>
      <button type="button" onClick={() => setIsOpen(!isOpen)}>
        <div>
          {title}
          {isOpen ? <GoChevronUp /> : <GoChevronDown />}
        </div>
      </button>
      {isOpen && (
        <div>
          {error && (
            <div>
              <MdClear />
              Não conseguiu ter acesso
            </div>
          )}
          {loading && <CircleSpinner color="#000" />}
          {items.length !== 0 && (
            <ul>
              <SettingsItem email={email} placeholder={placeholder} />
              {items &&
                items.map(item => (
                  <SettingsItem item={item} key={item.id} email={email} />
                ))}
            </ul>
          )}
        </div>
      )}
    </Container>
  );
}

SettingsContainer.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.bool,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string,
    })
  ).isRequired,
  email: PropTypes.bool,
  title: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
};

SettingsContainer.defaultProps = {
  loading: false,
  error: false,
  email: null,
  placeholder: null,
};
