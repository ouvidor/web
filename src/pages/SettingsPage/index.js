/**
 * Nessa página o Admin Master configura os dados que podem mudar com o tempo.
 */
import React from 'react';

import SettingsContainer from './SettingsContainer';

import { Background, Container } from './styles';

export default function SettingsPage() {
  return (
    <Background>
      <Container>
        <header>
          <h1>Configurações</h1>
        </header>

        <SettingsContainer
          title="Categorias de manifestações"
          placeholder="Nova categoria"
          urlPath="category"
        />

        <SettingsContainer
          email
          title="Secretarias municipais"
          placeholder="Nova secretaria"
          urlPath="secretary"
        />

        <SettingsContainer
          title="Tipos de manifestações"
          placeholder="Novo tipo de manifestação"
          urlPath="type"
        />

        <SettingsContainer
          title="Status de manifestações"
          placeholder="Novo status para manifestações"
          urlPath="status"
        />

        <SettingsContainer
          title="Níveis de acesso ao sistema"
          placeholder="Novo nível"
          urlPath="role"
        />
      </Container>
    </Background>
  );
}
