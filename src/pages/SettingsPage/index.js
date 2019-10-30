/**
 * Nessa página o Admin Master configura os dados que podem mudar com o tempo.
 */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

import SettingsContainer from './SettingsContainer';
import { Background } from '../../styles';
import api from '../../services/api';

export default function SettingsPage({
  categoriesState,
  secretariatsState,
  typesState,
  statusState,
  loadingState,
  errorState,
}) {
  // loading states
  const [loadingCategories, setLoadingCategories] = useState(loadingState);
  const [loadingSecretariats, setLoadingSecretariats] = useState(loadingState);
  const [loadingTypes, setLoadingTypes] = useState(loadingState);
  const [loadingStatus, setLoadingStatus] = useState(loadingState);

  // error states
  const [errorCategories, setErrorCategories] = useState(errorState);
  const [errorSecretariats, setErrorSecretariats] = useState(errorState);
  const [errorTypes, setErrorTypes] = useState(errorState);
  const [errorStatus, setErrorStatus] = useState(errorState);

  // arrays de dados do sistema
  const [categories, setCategories] = useState(categoriesState);
  const [secretariats, setSecretariats] = useState(secretariatsState);
  const [types, setTypes] = useState(typesState);
  const [status, setStatus] = useState(statusState);

  // função para buscar na API
  async function fetchAndSet(path, setItem, setLoading, setError) {
    setLoading(true);
    setError(false);
    try {
      const { data } = await api.get(path);
      setItem(data);
      setLoading(false);
      setError(false);
    } catch (err) {
      toast.error(`Ocorreu um erro na busca por ${path}`);
      setError(true);
      setLoading(false);
    }
  }

  // pega todos os dados na API quando for carregar a página
  useEffect(() => {
    fetchAndSet(
      'categories',
      setCategories,
      setLoadingCategories,
      setErrorCategories
    );
    fetchAndSet(
      'secretariats',
      setSecretariats,
      setLoadingSecretariats,
      setErrorSecretariats
    );
    fetchAndSet('types', setTypes, setLoadingTypes, setErrorTypes);
    fetchAndSet('status', setStatus, setLoadingStatus, setErrorStatus);
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
        loading={loadingCategories}
        error={errorCategories}
      />

      <SettingsContainer
        items={secretariats}
        email
        title="Secretarias municipais"
        placeholder="Nova secretaria"
        loading={loadingSecretariats}
        error={errorSecretariats}
      />

      <SettingsContainer
        items={types}
        title="Tipos de manifestações"
        placeholder="Novo tipo de manifestação"
        loading={loadingTypes}
        error={errorTypes}
      />

      <SettingsContainer
        items={status}
        title="Status de manifestações"
        placeholder="Novo status para manifestações"
        loading={loadingStatus}
        error={errorStatus}
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
  loadingState: PropTypes.bool,
  errorState: PropTypes.bool,
};

SettingsPage.defaultProps = {
  categoriesState: [],
  secretariatsState: [],
  typesState: [],
  statusState: [],
  loadingState: false,
  errorState: false,
};
