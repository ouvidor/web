/**
 * Nessa página o Admin Master configura os dados que podem mudar com o tempo.
 */
import React from 'react';
import PropTypes from 'prop-types';

import SettingsContainer from './SettingsContainer';

import { Background, Container } from './styles';

export default function SettingsPage({
  categoriesState,
  secretariatsState,
  typesState,
  statusState,
  rolesState,
}) {
  return (
    <Background>
      <Container>
        <header>
          <h1>Configurações</h1>
        </header>

        <SettingsContainer
          itemsState={categoriesState}
          title="Categorias de manifestações"
          placeholder="Nova categoria"
          urlPath="category"
        />

        <SettingsContainer
          items={secretariatsState}
          email
          title="Secretarias municipais"
          placeholder="Nova secretaria"
          urlPath="secretary"
        />

        <SettingsContainer
          items={typesState}
          title="Tipos de manifestações"
          placeholder="Novo tipo de manifestação"
          urlPath="type"
        />

        <SettingsContainer
          items={statusState}
          title="Status de manifestações"
          placeholder="Novo status para manifestações"
          urlPath="status"
        />

        <SettingsContainer
          items={rolesState}
          title="Níveis de acesso ao sistema"
          placeholder="Novo nível"
          urlPath="role"
        />
      </Container>
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
  rolesState: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      level: PropTypes.number,
    })
  ),
};

SettingsPage.defaultProps = {
  rolesState: [],
  categoriesState: [],
  secretariatsState: [],
  typesState: [],
  statusState: [],
};
