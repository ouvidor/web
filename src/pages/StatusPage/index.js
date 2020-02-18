import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Formik, Form } from 'formik';
import { toast } from 'react-toastify';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

import Api from '../../services/api';
import Tag from '../../components/Tag';
import Select from '../../components/Select';
import Field from '../../components/Field';
// import DatePicker from '../../components/DatePicker';
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
  const [selected, setSelected] = useState(null);
  const [isEditing, setEditing] = useState(false);

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

  // seleção de status da manifestação
  function handleSelect(manifestationStatus) {
    setEditing(true);
    setSelected(manifestationStatus);
  }

  function handleCreate() {
    setEditing(false);
    setSelected(null);
  }

  async function handleSubmit(data) {
    const formattedData = { ...data, status_id: data.status.id };

    if (isEditing) {
      const resultData = await Api.put({
        pathUrl: `manifestation/status/${selected.id}`,
        data: formattedData,
      });
      if (resultData) {
        toast.success(
          `Status da manifestação "${manifestation.title}" editado com sucesso`
        );
        search(id);
      }
    } else {
      const resultData = await Api.put({
        pathUrl: `/manifestation/${id}/status`,
        data: formattedData,
      });
      if (resultData) {
        toast.success(
          `Status "${data.title}" criado para a manifestação "${manifestation.title}"`
        );
        search(id);
      }
    }
  }

  function getInitialValues() {
    if (!selected) return { status: null, description: '', created_at: '' };
    return selected;
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

        <Formik
          initialValues={getInitialValues()}
          key={JSON.stringify(selected)}
          onSubmit={handleSubmit}
        >
          {({
            values,
            errors,
            touched,
            setFieldValue,
            setFieldTouched,
            setValues,
          }) => (
            <>
              <StatusContainer>
                <Form>
                  <Select
                    alternativeStyle
                    name="status"
                    options={status}
                    placeholder="Escolha um status"
                    value={values.status}
                    onChange={setFieldValue}
                    onBlur={setFieldTouched}
                    error={errors.status}
                    touched={touched.status}
                  />

                  <Field
                    component="textarea"
                    name="description"
                    placeholder="Corpo do texto da mudança de status da manifestação"
                    maxLength={610}
                  />

                  <footer>
                    {/* <DatePicker
                      name="created_at"
                      placeholder="Data do status"
                      value={values.created_at}
                      onChange={setFieldValue}
                      onBlur={setFieldTouched}
                      error={errors.created_at}
                      touched={touched.created_at}
                    /> */}
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
                          handleSelect={() => {
                            handleSelect(ms, setValues);
                          }}
                        />
                      ))}
                  </ul>
                </Scroll>
              </HistoryContainer>
            </>
          )}
        </Formik>
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
