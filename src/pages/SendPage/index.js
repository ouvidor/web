import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Form, Input } from '@rocketseat/unform';
import { toast } from 'react-toastify';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

import { StyledForm, Container, TagList } from './styles';
import api from '../../services/api';
import { Background } from '../../styles';
import Tag from '../../components/Tag';
import Select from '../../components/Select';

export default function SendPage({ match, history }) {
  const { id } = match.params;
  const [manifestation, setManifestation] = useState(null);
  const [secretariats, setSecretariats] = useState([]);

  const search = useCallback(
    async idOrProtocol => {
      if (!idOrProtocol) return;

      let result;
      try {
        // busca pela manifestação
        result = await api
          .get(`/manifestation/${idOrProtocol}`)
          .catch(() => history.push('/send'));

        // formatar a data
        const date =
          result.data.created_at &&
          format(parseISO(result.data.created_at), "dd 'de' MMMM 'de' yyyy", {
            locale: pt,
          });
        const formattedData = { ...result.data, formattedDate: date };
        setManifestation(formattedData);

        // busca pelas secretarias
        result = await api.get('/secretary');
        setSecretariats(result.data);
      } catch (err) {
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

  // envio do email
  async function handleSend(data) {
    data = { ...data, email: data.secretary.email };
    delete data.secretary;

    try {
      await api.post('/email', data);
      toast.success('Email enviado com sucesso');
    } catch (err) {
      toast.error('O email não pôde ser enviado, erro de conexão');
    }
  }

  // renderiza o formulario de busca por protocolo
  if (!manifestation)
    return (
      <Background>
        <h1>Direcionar manifestação para secretária</h1>
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
            <Form onSubmit={handleSend}>
              <Input
                name="title"
                placeholder="Título do email"
                maxLength={145}
              />

              <Input
                multiline
                name="text"
                placeholder="Corpo do email"
                maxLength={1200}
              />
              <footer>
                <Select
                  name="secretary"
                  placeholder="Para qual secretaria enviar?"
                  options={secretariats}
                  alternativeStyle
                  returnObject
                />
                <button type="submit">Enviar</button>
              </footer>
            </Form>
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
