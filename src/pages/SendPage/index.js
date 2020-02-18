import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { ImpulseSpinner } from 'react-spinners-kit';
import { Formik, Form } from 'formik';
import { toast } from 'react-toastify';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import * as Yup from 'yup';

import { Container, TagList } from './styles';
import Api from '../../services/api';
import { Background } from '../../styles';
import Tag from '../../components/Tag';
import Select from '../../components/Select';
import Field from '../../components/Field';
import SearchManifestationByProtocol from '../../components/SearchManifestationByProtocol';

export default function SendPage({ match, history }) {
  const { id } = match.params;
  const [loading, setLoading] = useState(false);
  const [manifestation, setManifestation] = useState(null);
  const [secretariats, setSecretariats] = useState([]);

  const validationSchema = Yup.object().shape({
    title: Yup.string()
      .max(145, 'No máximo 145 caracteres')
      .required('Um título é necessário'),
    text: Yup.string().required('O conteudo do email é necessário'),
  });

  const search = useCallback(
    async idOrProtocol => {
      if (!idOrProtocol) return;

      // busca pela manifestação
      const manifestationData = await Api.get({
        pathUrl: `/manifestation/${idOrProtocol}`,
      });
      if (!manifestationData) {
        history.push('/send');
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
      const formattedData = { ...manifestationData, formattedDate: date };
      setManifestation(formattedData);

      // busca pelas secretarias
      const secretariatsData = await Api.get({ pathUrl: '/secretary' });
      setSecretariats(secretariatsData);
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

  // envio do email
  async function handleSend(data) {
    setLoading(true);
    data = { ...data, email: data.secretary.email };
    delete data.secretary;

    const mailResponseData = await Api.post({ pathUrl: '/email', data });

    if (mailResponseData) {
      toast.success(mailResponseData.message);
    }

    setLoading(false);
  }

  // renderiza o formulario de busca por protocolo
  if (!manifestation)
    return (
      <Background>
        <SearchManifestationByProtocol
          label="Direcionar manifestação para secretária"
          handleFetch={handleFetch}
        />
      </Background>
    );

  return (
    <Background>
      <Container>
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

          <footer>
            <span>{manifestation.formattedDate}</span>
          </footer>

          <section>
            <header>
              <h2>Conteudo do email</h2>
              <Select
                name="base"
                placeholder="Selecione uma base"
                options={[]}
                alternativeStyle
              />
            </header>
            <Formik
              initialValues={{ title: '', text: '', secretary: null }}
              validationSchema={validationSchema}
              onSubmit={handleSend}
            >
              {({
                values,
                errors,
                touched,
                setFieldValue,
                setFieldTouched,
              }) => (
                <Form>
                  <Field
                    name="title"
                    placeholder="Título do email"
                    maxLength={145}
                  />

                  <Field
                    name="text"
                    component="textarea"
                    placeholder="Corpo do email"
                  />
                  <footer>
                    <Select
                      name="secretary"
                      placeholder="Para qual secretaria enviar?"
                      options={secretariats}
                      alternativeStyle
                      value={values.secretary}
                      error={errors.secretary}
                      touched={touched.secretary}
                      onChange={setFieldValue}
                      onBlur={setFieldTouched}
                    />
                    <button type="submit">
                      {loading ? (
                        <ImpulseSpinner
                          frontColor="#fff"
                          size={42}
                          backColor="rgba(0,0,0,0.2)"
                        />
                      ) : (
                        <>Enviar</>
                      )}
                    </button>
                  </footer>
                </Form>
              )}
            </Formik>
          </section>
        </div>
      </Container>
    </Background>
  );
}

SendPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
