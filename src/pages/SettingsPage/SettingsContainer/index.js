import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { GoChevronDown, GoChevronUp } from 'react-icons/go';
import { Container } from './styles';
import SettingsItem from './SettingsItem';

export default function SettingsContainer({
  items,
  email,
  title,
  placeholder,
}) {
  const [isOpen, setIsOpen] = useState(true);

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
          <ul>
            <SettingsItem email={email} placeholder={placeholder} />
            {items &&
              items.map(item => (
                <SettingsItem item={item} key={item.id} email={email} />
              ))}
          </ul>
        </div>
      )}
    </Container>
  );
}

SettingsContainer.propTypes = {
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

SettingsContainer.defaultProps = { email: null, placeholder: null };
