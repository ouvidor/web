import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import SettingsContainer from './SettingsContainer';
import { Background } from '../../styles';

export default function SettingsPage({
  categoriesState,
  secretariatsState,
  typesState,
  statusState,
}) {
  const [categories, setCategories] = useState(categoriesState);
  const [secretariats, setSecretariats] = useState(secretariatsState);
  const [types, setTypes] = useState(typesState);
  const [status, setStatus] = useState(statusState);

  useEffect(() => {
    setCategories(categoriesState);
    console.log(categoriesState);
    setSecretariats(secretariatsState);
    setTypes(typesState);
    setStatus(statusState);
  }, []);

  return (
    <Background>
      <header>
        <h1>Configurações</h1>
      </header>

      <SettingsContainer
        items={categories}
        title="Categorias de manifestações"
        placeholder="Nova categoria"
      />

      <SettingsContainer
        items={secretariats}
        email
        title="Secretarias municipais"
        placeholder="Nova secretaria"
      />

      <SettingsContainer
        items={types}
        title="Tipos de manifestações"
        placeholder="Novo tipo de manifestação"
      />

      <SettingsContainer
        items={status}
        title="Status de manifestações"
        placeholder="Novo status para manifestações"
      />
    </Background>
  );
}

SettingsPage.propTypes = {
  categoriesState: PropTypes.arrayOf(
    PropTypes.shape({ id: PropTypes.number, title: PropTypes.title })
  ),
  secretariatsState: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      email: PropTypes.string,
    })
  ),
  typesState: PropTypes.arrayOf(
    PropTypes.shape({ id: PropTypes.number, title: PropTypes.string })
  ),
  statusState: PropTypes.arrayOf(
    PropTypes.shape({ id: PropTypes.number, title: PropTypes.string })
  ),
};

SettingsPage.defaultProps = {
  categoriesState: [],
  secretariatsState: [],
  typesState: [],
  statusState: [],
};
