import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { MdCheck, MdClear } from 'react-icons/md';

import { Container } from './styles';

const SettingsItem = ({ handleSave, handleDelete, email, item }) => (
  <li key={item && item.id}>
    <input name="title" />
    {email && <input name="email" />}
    <button type="button" onClick={() => handleSave()} label="Enviar">
      <MdCheck />
    </button>
    <button type="button" label="Enviar">
      <MdClear />
    </button>
  </li>
);

export default function SettingsContainer({ items, email, title }) {
  const [isOpen, setIsOpen] = useState(false);

  function handleSubmit(data) {
    console.log(data);
  }

  return (
    <Container>
      <button type="button" onClick={() => setIsOpen(!isOpen)}>
        {title}
      </button>
      {isOpen && (
        <div>
          <ul>
            <SettingsItem handleSubmit={handleSubmit} email={email} />
            {/* <li>
              <Form onSubmit={handleSubmit}>
                <Input name="title" />
                {email && <Input name="email" />}
                <button type="submit" label="Enviar">
                  <MdCheck />
                </button>
              </Form>
            </li> */}
            {items &&
              items.map(item => (
                <li key={item.id}>
                  <Form initialData={item}>
                    <Input name="title" />
                    {email && <Input name="email" />}
                    <button type="submit" label="Enviar">
                      <MdCheck />
                    </button>
                  </Form>
                </li>
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

SettingsItem.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  email: PropTypes.bool,
  item: PropTypes.shape({ id: PropTypes.number, title: PropTypes.string }),
};

SettingsItem.defaultProps = { email: null, item: null };
