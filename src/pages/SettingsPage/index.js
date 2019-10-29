import React, { useState, useEffect } from 'react';

import SettingsContainer from './SettingsContainer';
import { Background } from '../../styles';

export default function SettingsPage() {
  const [categories, setCategories] = useState([]);
  const [secretariats, setSecretariats] = useState([]);
  const [types, setTypes] = useState([]);
  const [status, setStatus] = useState([]);

  useEffect(() => {
    setCategories([{ id: 1, title: 'Saneamento' }]);
    setSecretariats([{ id: 1, title: 'Secretaria da Saúde' }]);
    setTypes([{ id: 1, title: 'Denúncia' }]);
    setStatus([{ id: 1, title: 'Em progresso' }]);
  }, []);

  return (
    <Background>
      <header>
        <h1>Configurações</h1>
      </header>

      <SettingsContainer
        items={categories}
        title="Categorias de manifestações"
      />

      <SettingsContainer
        items={secretariats}
        email
        title="Secretarias municipais"
      />

      <SettingsContainer items={types} title="Tipos de manifestações" />

      <SettingsContainer items={status} title="Status de manifestações" />
    </Background>
  );
}
