import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Form, Input } from '@rocketseat/unform';
import { toast } from 'react-toastify';

import {
  StyledForm,
  GridContainer,
  TagList,
  ManifestationContainer,
  StatusContainer,
  HistoryContainer,
} from './styles';
import api from '../../services/api';
import { Background } from '../../styles';
import Tag from '../../components/Tag';
import Select from '../../components/Select';

export default function StatusPage({ match, history }) {
  const { id } = match.params;
  // const [manifestation, setManifestation] = useState(null);
  const [manifestation, setManifestation] = useState({
    created_at: '2019-12-09T16:30:17.000Z',
    description: 'reclamando muito sobre um buraco na rua',
    id: 18,
    latitude: '-22.8843926',
    location: 'Rua Inglaterra, Cabo Frio',
    longitude: '-42.0362597',
    protocol: '0',
    read: 0,
    secretary_id: null,
    title: 'Reclamação',
    type: { id: 1, title: 'Reclamação' },
    type_id: 1,
    updated_at: '2019-12-09T16:30:17.000Z',
    user_id: 1,
    categories: [{ id: 1, title: 'saneamento' }],
  });
  const [status, setStatus] = useState([]);

  const search = useCallback(
    async ({ protocol, manifestationId }) => {
      let result;
      try {
        if (manifestationId) {
          result = await api
            .get(`/manifestation/${manifestationId}`)
            .catch(() => history.push('/send'));

          setManifestation(result.data);
          return;
        }

        if (protocol && !manifestationId) {
          result = await api.get(`/manifestation`, {
            params: { text: protocol },
          });
          if (!result && !result.data && !result.data.rows[0]) {
            throw new Error();
          }
          setManifestation(result.data.rows[0]);
        }

        result = await api.get('/status');
        setStatus(result.data);
      } catch (err) {
        toast.error('Não pôde concluir a busca, erro na conexão');
      }
    },
    [history]
  );

  // busca atráves da id da manifestação
  useEffect(() => {
    search({ manifestationId: id });
  }, [id, search]);

  // pesquisa pelo protocolo inserido
  async function handleFetch(data) {
    const { protocol } = data;
    search({ protocol });
  }

  // renderiza o formulario de busca por protocolo
  if (!manifestation)
    return (
      <Background>
        <h1>Histórico de status</h1>
        <StyledForm onSubmit={handleFetch}>
          <Input
            placeholder="Exemplo: 20190330111"
            name="protocol"
            label="Número de protocolo"
          />
          <button type="submit">Buscar</button>
        </StyledForm>
      </Background>
    );

  return (
    <Background>
      <GridContainer>
        <ManifestationContainer>
          <header>
            <span>protocolo: {manifestation.protocol}</span>
          </header>
          <div>
            <h1>{manifestation.title}</h1>
            <TagList>
              {manifestation.categories &&
                [...manifestation.categories, manifestation.type].map(tag => (
                  <Tag key={tag.title} tag={tag} />
                ))}
            </TagList>
            <p>{manifestation.description}</p>
          </div>
        </ManifestationContainer>

        <StatusContainer>
          <h2>Em andamento</h2>
          <Select
            name="status"
            placeholder="Qual é o novo status?"
            options={status}
            alternativeStyle
            returnObject
          />
        </StatusContainer>

        <HistoryContainer>
          <button type="button">Criar</button>
          <ul>
            <li>
              <span>Recebido</span>
              <div />
            </li>
            <li>
              <span>Em andamento</span>
              <div />
            </li>
          </ul>
        </HistoryContainer>
      </GridContainer>
    </Background>
  );
}

StatusPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
