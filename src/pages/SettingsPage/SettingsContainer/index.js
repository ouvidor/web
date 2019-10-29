import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Container } from './styles';
import SettingsItem from './SettingsItem';

export default function SettingsContainer({ items, email, title }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Container>
      <button type="button" onClick={() => setIsOpen(!isOpen)}>
        {title}
      </button>
      {isOpen && (
        <div>
          <ul>
            <SettingsItem email={email} />
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
};

SettingsContainer.defaultProps = { email: null };
