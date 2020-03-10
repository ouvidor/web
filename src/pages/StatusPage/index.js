import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

import Api from '../../services/api';
import Tag from '../../components/Tag';
// import Datepicker from '../../components/Form/Datepicker';
import Select from '../../components/Form/Select';
import Field from '../../components/Form/Field';
import SearchManifestationByProtocol from '../../components/SearchManifestationByProtocol';
import { Background } from '../../styles';
import {
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
  const [selectedId, setSelectedId] = useState(null);
  const [isEditing, setEditing] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    errors,
    setValue,
    reset,
  } = useForm();

  const search = useCallback(
    async idOrProtocol => {
      if (!idOrProtocol) return;

      // buscar dados da manifestação
      const manifestationData = await Api.get({
        pathUrl: `manifestation/${idOrProtocol}`,
      });

      if (!manifestationData) {
        history.push('/status');
        return;
      }

      // formatar a data
      const date =
        manifestationData.created_at &&
        format(
          parseISO(manifestationData.created_at),
          "dd 'de' MMMM 'de' yyyy",
          {
            locale: pt,
          }
        );
      const formattedData = {
        ...manifestationData,
        formattedDate: date,
      };
      setManifestation(formattedData);

      // buscar historico de status da manifestação
      const manifestationStatusHistoryData = await Api.get({
        pathUrl: `manifestation/${idOrProtocol}/status`,
      });

      if (!manifestationStatusHistoryData) {
        history.push('/status');
      }
      setStatusHistory(manifestationStatusHistoryData);

      // buscar lista de status possíveis
      const statusData = await Api.get({ pathUrl: '/status' });
      setStatus(statusData);
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

  function handleCreate() {
    reset();
    setEditing(false);
    setSelectedId(null);
  }

  async function onSubmit(data) {
    const formattedData = { ...data, status_id: data.status.id };

    if (isEditing) {
      const resultData = await Api.put({
        pathUrl: `manifestation/status/${selectedId}`,
        data: formattedData,
      });
      if (resultData) {
        toast.success(
          `Status da manifestação "${manifestation.title}" editado com sucesso`
        );
        search(id);
      }
    } else {
      const resultData = await Api.post({
        pathUrl: `/manifestation/${id}/status`,
        data: formattedData,
      });
      if (resultData) {
        toast.success(
          `Novo status criado para a manifestação "${manifestation.title}"`
        );
        search(id);
      }
    }
  }

  // renderiza o formulario de busca por protocolo
  if (!manifestation)
    return (
      <Background>
        <SearchManifestationByProtocol
          label="Histórico de status"
          handleFetch={handleFetch}
        />
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
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              as={<Select alternativeStyle />}
              control={control}
              options={status}
              name="status"
              placeholder="Escolha um status"
              errors={errors}
            />

            <Field
              component="textarea"
              name="description"
              placeholder="Corpo do texto da mudança de status da manifestação"
              maxLength={610}
              register={register}
              errors={errors}
            />

            <footer>
              {/* <Controller
                as={<Datepicker />}
                control={control}
                name="created_at"
              /> */}
              <button type="submit">Salvar</button>
            </footer>
          </form>
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
                    onClick={() => {
                      setEditing(true);
                      setSelectedId(ms.id);
                      setValue([
                        { status: ms.status },
                        { description: ms.description },
                      ]);
                    }}
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
