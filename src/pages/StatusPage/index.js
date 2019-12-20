import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Form, Input } from '@rocketseat/unform';
import { toast } from 'react-toastify';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

import api from '../../services/api';
import Tag from '../../components/Tag';
import Select from '../../components/Select';
import DatePicker from '../../components/DatePicker';
import { Background } from '../../styles';
import {
  StyledForm,
  GridContainer,
  TagList,
  ManifestationContainer,
  StatusContainer,
  HistoryContainer,
  Scroll,
} from './styles';
import StatusCard from './StatusCard';

export default function StatusPage({ match, history }) {
  const { id } = match.params;
  const [manifestation, setManifestation] = useState(null);
  const [statusHistory, setStatusHistory] = useState([]);
  const [status, setStatus] = useState([]);
  const [selected, setSelected] = useState(null);
  const [isEditing, setEditing] = useState(false);

  const search = useCallback(
    async idOrProtocol => {
      if (!idOrProtocol) return;

      let result;
      try {
        // buscar dados da manifestação
        result = await api
          .get(`manifestation/${idOrProtocol}`)
          .catch(() => history.push('/status'));

        // formatar a data
        const date =
          result.data.created_at &&
          format(parseISO(result.data.created_at), "dd 'de' MMMM 'de' yyyy", {
            locale: pt,
          });
        const formattedData = { ...result.data, formattedDate: date };
        setManifestation(formattedData);

        // buscar historico de status da manifestação
        result = await api
          .get(`manifestation/${idOrProtocol}/status`)
          .catch(() => history.push('/status'));
        setStatusHistory(result.data);
        console.log(result.data);

        // buscar lista de status possíveis
        result = await api.get('/status');
        setStatus(result.data);
      } catch (err) {
        console.error(err);
        toast.error('Não pôde concluir a busca, erro na conexão');
      }
    },
    [history]
  );

  // busca atráves da id da manifestação
  useEffect(() => {
    search(id);
  }, [id, search]);

  // pesquisa pelo protocolo inserido
  async function handleFetch(data) {
    search(data.protocol);
  }

  // seleção de status da manifestação
  function handleSelect(manifestationStatus) {
    setEditing(true);
    setSelected(manifestationStatus);
  }

  function handleCreate() {
    setEditing(false);
    setSelected(null);
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

          <footer>{manifestation.formattedDate}</footer>
        </ManifestationContainer>

        <StatusContainer>
          <Form
            onSubmit={data => {
              console.log(data);
            }}
            initialData={selected}
          >
            <Select
              name="status_id"
              options={status}
              placeholder="Escolha um status"
              alternativeStyle
            />

            <Input
              multiline
              name="description"
              placeholder="Corpo do texto da mudança de status da manifestação"
              maxLength={610}
            />

            <footer>
              <DatePicker name="created_at" placeholder="Data do status" />
              <button type="submit">Salvar</button>
            </footer>
          </Form>
        </StatusContainer>

        <HistoryContainer>
          <button type="button" onClick={handleCreate}>
            Adicionar novo status à manifestação
          </button>
          <Scroll>
            <ul>
              {statusHistory &&
                statusHistory.map(ms => (
                  <StatusCard
                    key={ms.id}
                    manifestationStatus={ms}
                    handleSelect={() => handleSelect(ms)}
                  />
                ))}
            </ul>
          </Scroll>
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
