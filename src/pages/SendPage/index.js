import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Textarea } from '@rocketseat/unform';

import { Container } from './styles';
// import api from '../../services/api';
import Tag from '../../components/Tag';
import Select from '../../components/Select';

export default function SendPage({ match, manifestationState }) {
  const { id } = match.params;
  const [manifestation, setManifestation] = useState(manifestationState);

  // busca pela manifestação
  useEffect(() => {
    async function fetchManifestation() {
      if (!id) return;
      // const result = await api.get(`/manifestation/${id}`);
      // if (!result && !result.data) return;

      // setManifestation(result.data);
      setManifestation({
        id: 1,
        title: 'aa',
        description: 'bb',
        type: 1,
        category: 2,
        protocol: '2016028589725',
      });
    }
    fetchManifestation();
  }, []);

  function handleFetch() {}

  function handleSend() {}

  // renderiza o formulario de busca por protocolo
  if (!manifestation)
    return (
      <Container>
        <h1>Direcionar manifestação para secretária</h1>
        <Form onSubmit={handleFetch}>
          <Input
            placeholder="protocolo"
            name="protocol"
            label="Número de protocolo"
          />
        </Form>
      </Container>
    );

  return (
    <Container>
      <header>
        <button type="button">voltar</button>
        <span>protocolo: {manifestation.protocol}</span>
      </header>
      <div>
        <h1>{manifestation.title}</h1>
        {manifestation.type && <Tag tag={{ id: 1, name: 'Reclamação' }} />}
        {manifestation.category && <Tag tag={{ id: 1, name: 'Rua' }} />}
        <p>{manifestation.description}</p>

        <section>
          <span>Conteudo do email</span>
          {/* <Select name="base" options={[]} /> */}
          <Form onSubmit={handleSend}>
            <Textarea name="mailBody" />
            <div>
              <Select
                name="municipalSecretariat"
                options={[{ id: 1, title: 'Secretaria de Saúde' }]}
              />
              <button type="submit">Enviar</button>
            </div>
          </Form>
        </section>
      </div>
    </Container>
  );
}

SendPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
  manifestationState: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    description: PropTypes.string,
    type: PropTypes.number,
    category: PropTypes.number,
  }),
};

SendPage.defaultProps = {
  manifestationState: null,
};
